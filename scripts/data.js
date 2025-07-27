// Static data for the e-commerce website
export const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "A comfortable and responsive wireless mouse with ergonomic design. Perfect for both work and gaming with precision tracking and long battery life.",
    price: 25.99,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    stock: 100,
    rating: 4.5,
    reviews: 120
  },
  {
    id: 2,
    name: "Gaming Keyboard",
    description: "Mechanical keyboard with customizable RGB lighting and macro keys. Built for gamers with tactile switches and anti-ghosting technology.",
    price: 59.99,
    image: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    stock: 50,
    rating: 4.7,
    reviews: 85
  },
  {
    id: 3,
    name: "Men's Sneakers",
    description: "Stylish and comfortable sneakers for casual and athletic wear. Made with breathable materials and cushioned sole for all-day comfort.",
    price: 40.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Footwear",
    stock: 60,
    rating: 4.2,
    reviews: 200
  },
  {
    id: 4,
    name: "Women's Handbag",
    description: "Elegant and spacious handbag perfect for daily use. Features multiple compartments and premium leather construction.",
    price: 75.00,
    image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Accessories",
    stock: 30,
    rating: 4.8,
    reviews: 45
  },
  {
    id: 5,
    name: "Smartphone",
    description: "Latest smartphone with advanced features and sleek design. High-resolution camera, fast processor, and all-day battery life.",
    price: 699.99,
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    stock: 25,
    rating: 4.9,
    reviews: 300
  },
  {
    id: 6,
    name: "Yoga Mat",
    description: "Non-slip yoga mat ideal for home and studio workouts. Eco-friendly material with excellent grip and cushioning.",
    price: 19.99,
    image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Sports",
    stock: 80,
    rating: 4.6,
    reviews: 150
  },
  {
    id: 7,
    name: "Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.",
    price: 129.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    stock: 45,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 8,
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe. Brew perfect coffee every morning with customizable strength settings.",
    price: 89.99,
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Home Appliances",
    stock: 35,
    rating: 4.4,
    reviews: 67
  }
];

export const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Footwear" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Sports" },
  { id: 6, name: "Home Appliances" }
];

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "customer",
    address: "123 Elm Street, Springfield",
    phone: "123-456-7890"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "securepass456",
    role: "customer",
    address: "456 Maple Avenue, Metropolis",
    phone: "987-654-3210"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    password: "adminpass789",
    role: "admin"
  }
];

export const banners = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Winter Sale",
    description: "Up to 50% off on selected items"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "New Arrivals",
    description: "Check out the latest additions to our collection"
  }
];