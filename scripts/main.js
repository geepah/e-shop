import { fetchProducts } from './api.js'; 

// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('E-Shop is ready!');

  // Example: Add an event listener to the navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Navigating to: ${e.target.textContent}`);
      // You can add navigation logic here later
    });
  });
});

// Function to render products on the homepage
async function renderProducts() {
  const products = await fetchProducts(); // Fetch products
  const productContainer = document.getElementById('product-container');

  if (products.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  // Generate HTML for each product
  const productCards = products.map(product => `
    <div class="product-card">
      <img src="assets/images/${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price.toFixed(2)}</p>
      <a href="pages/product.html?id=${product.id}" class="btn">View Details</a>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');

  // Insert product cards into the container
  productContainer.innerHTML = productCards;
}

// Call renderProducts when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('E-Shop is ready!');
  renderProducts(); // Render products on the homepage
});