import { fetchProducts, fetchBanners, searchProducts } from './api.js';
import { updateNavigation } from './auth.js';
import { updateCartCount } from './cart.js';
import { updateWishlistCount } from './wishlist.js';
import { debounce } from './utils.js';

// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('E-Shop is ready!');
  
  // Initialize the application
  initializeApp();
});

// Initialize the application
async function initializeApp() {
  updateNavigation();
  updateCartCount();
  updateWishlistCount();
  
  await renderBanners();
  await renderProducts();
  setupSearch();
  setupCategoryFilter();
}

// Function to render banners
async function renderBanners() {
  const banners = await fetchBanners();
  const bannerContainer = document.getElementById('banner-container');
  
  if (!bannerContainer || banners.length === 0) return;
  
  const bannerHtml = banners.map(banner => `
    <div class="banner-slide">
      <img src="${banner.image}" alt="${banner.title}">
      <div class="banner-content">
        <h2>${banner.title}</h2>
        <p>${banner.description}</p>
        <a href="#featured-products" class="btn">Shop Now</a>
      </div>
    </div>
  `).join('');
  
  bannerContainer.innerHTML = bannerHtml;
  
  // Initialize banner slider
  initializeBannerSlider();
}
// Function to render products on the homepage
async function renderProducts() {
  const products = await fetchProducts(); // Fetch products
  const productContainer = document.getElementById('product-container');

  if (!productContainer) return;

  if (products.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  // Generate HTML for each product
  const productCards = products.map(product => `
    <div class="product-card">
      <img src="assets/images/${product.image}" alt="${product.name}">
      <div class="product-info">
      <h3>${product.name}</h3>
        <p class="product-description">${product.description.substring(0, 100)}...</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <button onclick="addToWishlist(${product.id})" class="wishlist-btn" data-product-id="${product.id}">
            🤍 Add to Wishlist
          </button>
          <button onclick="addToCart(${product.id})" class="add-to-cart-btn">Add to Cart</button>
        </div>
      <a href="pages/product.html?id=${product.id}" class="btn">View Details</a>
      </div>
    </div>
  `).join('');

  // Insert product cards into the container
  productContainer.innerHTML = productCards;
  
  // Update wishlist buttons
  if (window.updateWishlistButtons) {
    window.updateWishlistButtons();
  }
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput) return;
  
  const debouncedSearch = debounce(async (query) => {
    if (query.length < 2) {
      if (searchResults) searchResults.style.display = 'none';
      return;
    }
    
    const results = await searchProducts(query);
    displaySearchResults(results);
  }, 300);
  
  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
  
  // Hide search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      if (searchResults) searchResults.style.display = 'none';
    }
  });
}

// Display search results
function displaySearchResults(results) {
  const searchResults = document.getElementById('search-results');
  
  if (!searchResults) return;
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">No products found</div>';
  } else {
    const resultsHtml = results.slice(0, 5).map(product => `
      <div class="search-result-item">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <p>$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `).join('');
    
    searchResults.innerHTML = resultsHtml;
  }
  
  searchResults.style.display = 'block';
}

// Setup category filter
function setupCategoryFilter() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const category = e.target.dataset.category;
      
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      
      // Filter products
      if (category === 'all') {
        await renderProducts();
      } else {
        await renderProductsByCategory(category);
      }
    });
  });
}

// Render products by category
async function renderProductsByCategory(category) {
  const products = await fetchProducts();
  const filteredProducts = products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
  
  const productContainer = document.getElementById('product-container');
  
  if (!productContainer) return;
  
  if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>No products found in this category.</p>';
    return;
  }
  
  const productCards = filteredProducts.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description.substring(0, 100)}...</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <button onclick="addToWishlist(${product.id})" class="wishlist-btn" data-product-id="${product.id}">
            🤍 Add to Wishlist
          </button>
          <button onclick="addToCart(${product.id})" class="add-to-cart-btn">Add to Cart</button>
        </div>
        <a href="pages/product.html?id=${product.id}" class="btn">View Details</a>
      </div>
    </div>
  `).join('');
  
  productContainer.innerHTML = productCards;
  
  if (window.updateWishlistButtons) {
    window.updateWishlistButtons();
  }
}

// Initialize banner slider
function initializeBannerSlider() {
  const bannerContainer = document.getElementById('banner-container');
  const slides = bannerContainer?.querySelectorAll('.banner-slide');
  
  if (!slides || slides.length <= 1) return;
  
  let currentSlide = 0;
  
  // Show first slide
  slides[0].classList.add('active');
  
  // Auto-advance slides
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}