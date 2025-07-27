import { authenticateUser, registerUser } from './api.js';

// Get current user from localStorage
export function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Set current user in localStorage
export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Remove current user from localStorage
export function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = '../index.html';
}

// Check if user is logged in
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Check if user is admin
export function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// Login function
export async function login(email, password) {
  try {
    const user = await authenticateUser(email, password);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    throw error;
  }
}

// Register function
export async function register(userData) {
  try {
    const user = await registerUser(userData);
    setCurrentUser(user);
    return user;
  } catch (error) {
    throw error;
  }
}

// Update navigation based on auth status
export function updateNavigation() {
  const user = getCurrentUser();
  const navList = document.querySelector('nav ul');
  
  if (!navList) return;
  
  // Remove existing auth-related nav items
  const existingAuthItems = navList.querySelectorAll('.auth-nav-item');
  existingAuthItems.forEach(item => item.remove());
  
  if (user) {
    // User is logged in
    const userItem = document.createElement('li');
    userItem.className = 'auth-nav-item';
    userItem.innerHTML = `<span class="user-greeting">Hello, ${user.name}</span>`;
    
    const logoutItem = document.createElement('li');
    logoutItem.className = 'auth-nav-item';
    logoutItem.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
    
    navList.appendChild(userItem);
    navList.appendChild(logoutItem);
    
    if (user.role === 'admin') {
      const adminItem = document.createElement('li');
      adminItem.className = 'auth-nav-item';
      adminItem.innerHTML = `<a href="pages/admin.html">Admin</a>`;
      navList.insertBefore(adminItem, logoutItem);
    }
  } else {
    // User is not logged in
    const loginItem = document.createElement('li');
    loginItem.className = 'auth-nav-item';
    loginItem.innerHTML = `<a href="pages/login.html">Login</a>`;
    
    const registerItem = document.createElement('li');
    registerItem.className = 'auth-nav-item';
    registerItem.innerHTML = `<a href="pages/register.html">Register</a>`;
    
    navList.appendChild(loginItem);
    navList.appendChild(registerItem);
  }
}

// Make logout function global
window.logout = logout;