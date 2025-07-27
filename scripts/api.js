import { products, categories, users, banners } from './data.js';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch products
export async function fetchProducts() {
  await delay(100); // Simulate network delay
  return products;
}

// Fetch single product by ID
export async function fetchProductById(id) {
  await delay(100);
  return products.find(product => product.id === parseInt(id));
}

// Fetch products by category
export async function fetchProductsByCategory(category) {
  await delay(100);
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
}

// Fetch categories
export async function fetchCategories() {
  await delay(100);
  return categories;
}

// Fetch banners
export async function fetchBanners() {
  await delay(100);
  return banners;
}

// Search products
export async function searchProducts(query) {
  await delay(100);
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}

// User authentication (mock)
export async function authenticateUser(email, password) {
  await delay(200);
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

// Register user (mock)
export async function registerUser(userData) {
  await delay(200);
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  const newUser = {
    id: users.length + 1,
    ...userData,
    role: 'customer'
  };
  
  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}