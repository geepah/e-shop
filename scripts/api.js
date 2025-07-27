//fetch products
async function fetchProducts(){
  try{
    const response = await fetch("http://localhost:5000/products");
    if (response.ok) {
      const products = await response.json();
      return products;
    }
    throw new Error("Failed to fetch products")
  }
  catch (error) {
    console.error("Failed to fetch error", error);
    return [];
  }
}
  
export { fetchProducts };
  