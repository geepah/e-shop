// Function to fetch products from the JSON Server
async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
  
  // Function to get the product ID from the URL
  function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
  }
  
  // Function to render product details
  async function renderProductDetails() {
    const productId = getProductIdFromUrl();
    const products = await fetchProducts();
    const product = products.find(p => p.id === productId);
  
    const productContent = document.getElementById('product-content');
  
    if (!product) {
      productContent.innerHTML = '<p>Product not found.</p>';
      return;
    }
  
    
    const addButton = document.getElementById('add-to-cart');
    if (addButton) {
      addButton.addEventListener('click', () => {
        addToCart(product.id);
      });
    }
    
    // Generate HTML for the product details
    const productHtml = `
      <div class="product-detail">
        <img src="../assets/images/${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Stock:</strong> ${product.stock} available</p>
        <p><strong>Rating:</strong> ${product.rating} ⭐ (${product.reviews} reviews)</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  
    // Insert product details into the container
    productContent.innerHTML = productHtml;
  }
  
  // Call renderProductDetails when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    renderProductDetails();
  });
  



