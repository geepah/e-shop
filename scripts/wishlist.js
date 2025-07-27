import { fetchProductById } from './api.js';

// Get wishlist from localStorage
export function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

// Save wishlist to localStorage
export function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

// Add item to wishlist
export async function addToWishlist(productId) {
    let wishlist = getWishlist();
    
    if (wishlist.includes(productId)) {
        showNotification('Product is already in your wishlist!');
        return;
    }
    
    wishlist.push(productId);
    saveWishlist(wishlist);
    showNotification('Product added to wishlist!');
    updateWishlistButtons();
}

// Remove item from wishlist
export function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist(wishlist);
    showNotification('Product removed from wishlist!');
    updateWishlistButtons();
    renderWishlist();
}

// Check if item is in wishlist
export function isInWishlist(productId) {
    return getWishlist().includes(productId);
}

// Get wishlist item count
export function getWishlistItemCount() {
    return getWishlist().length;
}

// Update wishlist count in navigation
export function updateWishlistCount() {
    const wishlistLinks = document.querySelectorAll('a[href*="wishlist.html"]');
    const count = getWishlistItemCount();
    
    wishlistLinks.forEach(link => {
        const countSpan = link.querySelector('.wishlist-count') || document.createElement('span');
        countSpan.className = 'wishlist-count';
        countSpan.textContent = count > 0 ? `(${count})` : '';
        
        if (!link.querySelector('.wishlist-count')) {
            link.appendChild(countSpan);
        }
    });
}

// Update wishlist buttons on product pages
export function updateWishlistButtons() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        const productId = parseInt(button.dataset.productId);
        const isWishlisted = isInWishlist(productId);
        
        button.classList.toggle('wishlisted', isWishlisted);
        button.innerHTML = isWishlisted ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist';
    });
}

// Render wishlist page
export async function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-items');
    
    if (!wishlistContainer) return;
    
    const wishlist = getWishlist();
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <h3>Your wishlist is empty</h3>
                <p>Add some products you love!</p>
                <a href="../index.html" class="btn">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    wishlistContainer.innerHTML = '';
    
    for (const productId of wishlist) {
        const product = await fetchProductById(productId);
        if (!product) continue;
        
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="wishlist-item-details">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <div class="wishlist-item-actions">
                    <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
                    <button onclick="removeFromWishlist(${product.id})" class="btn-secondary">Remove</button>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(wishlistItem);
    }
}

// Show notification
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make functions globally available
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;

// Initialize wishlist count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateWishlistButtons();
    if (document.getElementById('wishlist-items')) {
        renderWishlist();
    }
});