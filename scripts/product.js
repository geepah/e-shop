import { fetchProductById } from './api.js';
import { updateNavigation } from './auth.js';
import { updateCartCount } from './cart.js';
import { updateWishlistCount, updateWishlistButtons } from './wishlist.js';
  
  // Function to get the product ID from the URL
  function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
  }
  
  // Function to render product details
  async function renderProductDetails() {
    const productId = getProductIdFromUrl();
    const product = await fetchProductById(productId);
  
    const productContent = document.getElementById('product-content');
  
    if (!product) {
      productContent.innerHTML = '<p>Product not found.</p>';
      return;
    }
  
    // Generate HTML for the product details
    const productHtml = `
      <div class="product-detail">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details-content">
          <h1>${product.name}</h1>
          <div class="product-rating">
            <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
            <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
          </div>
          <p class="product-description">${product.description}</p>
          <div class="product-meta">
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Stock:</strong> ${product.stock} available</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
          </div>
          <div class="product-actions">
            <button onclick="addToWishlist(${product.id})" class="wishlist-btn btn-secondary" data-product-id="${product.id}">
              🤍 Add to Wishlist
            </button>
            <button onclick="addToCart(${product.id})" class="add-to-cart-btn btn">Add to Cart</button>
          </div>
          <div class="product-features">
            <h3>Features:</h3>
            <ul>
              <li>High quality materials</li>
              <li>Fast shipping</li>
              <li>30-day return policy</li>
              <li>1-year warranty</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  
    // Insert product details into the container
    productContent.innerHTML = productHtml;
    
    // Update wishlist button state
    updateWishlistButtons();
  }
  
  // Call renderProductDetails when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    updateCartCount();
    updateWishlistCount();
    renderProductDetails();
  });