// Get cart from local storage or initialize an empty array
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
    let cart = getCart();

    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart(cart);
    alert('Product added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart(); // Re-render cart UI if applicable
}

// Update item quantity
function updateCart(productId, quantity) {
    let cart = getCart();
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity = quantity > 0 ? quantity : 1;
    }

    saveCart(cart);
}

// Function to render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>Product ID: ${item.id}</p>
            <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateCart(${item.id}, this.value)"></p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Load cart when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});
