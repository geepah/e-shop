import { getCurrentUser } from './auth.js';
import { getCart, clearCart } from './cart.js';

// Get orders from localStorage
export function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

// Save orders to localStorage
export function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Create new order
export function createOrder(orderData) {
    const orders = getOrders();
    const user = getCurrentUser();
    
    if (!user) {
        throw new Error('User must be logged in to place an order');
    }
    
    const cart = getCart();
    if (cart.length === 0) {
        throw new Error('Cart is empty');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        products: cart,
        total: total,
        status: 'Processing',
        orderDate: new Date().toISOString().split('T')[0],
        shippingAddress: orderData.shippingAddress || user.address,
        paymentMethod: orderData.paymentMethod || 'Credit Card',
        trackingNumber: generateTrackingNumber()
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    clearCart();
    
    return newOrder;
}

// Get orders for current user
export function getUserOrders() {
    const user = getCurrentUser();
    if (!user) return [];
    
    const orders = getOrders();
    return orders.filter(order => order.userId === user.id);
}

// Get order by ID
export function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(order => order.id === parseInt(orderId));
}

// Update order status (admin only)
export function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === parseInt(orderId));
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        saveOrders(orders);
        return orders[orderIndex];
    }
    
    return null;
}

// Generate tracking number
function generateTrackingNumber() {
    return 'ES' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}

// Render orders page
export function renderOrders() {
    const ordersContainer = document.getElementById('orders-container');
    
    if (!ordersContainer) return;
    
    const orders = getUserOrders();
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-orders">
                <h3>No orders found</h3>
                <p>You haven't placed any orders yet.</p>
                <a href="../index.html" class="btn">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    ordersContainer.innerHTML = '';
    
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        
        const productsHtml = order.products.map(product => `
            <div class="order-product">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <p><strong>${product.name}</strong></p>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
        
        orderElement.innerHTML = `
            <div class="order-header">
                <h3>Order #${order.id}</h3>
                <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-details">
                <p><strong>Date:</strong> ${order.orderDate}</p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <p><strong>Tracking:</strong> ${order.trackingNumber}</p>
                <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
            </div>
            <div class="order-products">
                <h4>Products:</h4>
                ${productsHtml}
            </div>
        `;
        
        ordersContainer.appendChild(orderElement);
    });
}

// Process checkout
export function processCheckout(checkoutData) {
    try {
        const order = createOrder(checkoutData);
        return {
            success: true,
            order: order,
            message: 'Order placed successfully!'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

// Make functions globally available
window.createOrder = createOrder;
window.processCheckout = processCheckout;