import { fetchProductById } from './api.js';

// Get cart from local storage or initialize an empty array
export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to local storage
export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
export async function addToCart(productId) {
    let cart = getCart();
    const product = await fetchProductById(productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
            existingProduct.quantity += 1;
            showNotification('Product quantity updated in cart!');
        } else {
            showNotification('Cannot add more items. Stock limit reached!');
            return;
        }
    } else {
        cart.push({ 
            id: productId, 
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image
        });
        showNotification('Product added to cart!');
    }

    saveCart(cart);
}

// Remove item from cart
export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    showNotification('Product removed from cart!');
}

// Update item quantity
export async function updateCartQuantity(productId, quantity) {
    let cart = getCart();
    const product = await fetchProductById(productId);
    let cartItem = cart.find(item => item.id === productId);

    if (cartItem && product) {
        const newQuantity = Math.max(1, Math.min(quantity, product.stock));
        cartItem.quantity = newQuantity;
        saveCart(cart);
        renderCart();
    }
}

// Get cart total
export function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
export function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count in navigation
export function updateCartCount() {
    const cartLinks = document.querySelectorAll('a[href*="cart.html"]');
    const count = getCartItemCount();
    
    cartLinks.forEach(link => {
        const countSpan = link.querySelector('.cart-count') || document.createElement('span');
        countSpan.className = 'cart-count';
        countSpan.textContent = count > 0 ? `(${count})` : '';
        
        if (!link.querySelector('.cart-count')) {
            link.appendChild(countSpan);
        }
    });
}

// Clear cart
export function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    renderCart();
    showNotification('Cart cleared!');
}

// Function to render cart items
export async function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartContainer) return;
    
    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <a href="../index.html" class="btn">Continue Shopping</a>
            </div>
        `;
        if (cartTotalElement) cartTotalElement.textContent = 'Total: $0.00';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;

    for (const item of cart) {
        const product = await fetchProductById(item.id);
        if (!product) continue;

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)} each</p>
                <p class="stock-info">Stock: ${product.stock} available</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                <input type="number" value="${item.quantity}" min="1" max="${product.stock}" 
                       onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" ${item.quantity >= product.stock ? 'disabled' : ''}>+</button>
            </div>
            <div class="cart-item-total">
                <p>$${itemTotal.toFixed(2)}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    }

    if (cartTotalElement) {
        cartTotalElement.innerHTML = `
            <div class="cart-summary-details">
                <p>Subtotal: $${total.toFixed(2)}</p>
                <p>Shipping: Free</p>
                <p class="total-amount">Total: $${total.toFixed(2)}</p>
            </div>
        `;
    }
    
    if (checkoutBtn) {
        checkoutBtn.style.display = 'block';
    }
}

// Show notification
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});