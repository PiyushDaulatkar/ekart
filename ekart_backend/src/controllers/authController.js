// controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Product from '../models/Product.js';


const users = []; // In-memory user storage
let products = []; // In-memory product storage

function login(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  console.log(users);
  const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
  res.json({ token });
}


function getUsers(req, res) {
  res.json(users);
}

function register(req, res) {
    const { username, password } = req.body;
    // Check if the username is already taken
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }
  
    // Create a new User instance with the provided username, password, and an empty cart
    const newUser = new User(username, password);
  
    // Add the new user to the users array
    users.push(newUser);
  
    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ username: newUser.username }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  }
  

  // Function to add a new product
function addProduct(req, res) {
    const { name, price, stock, quantity, isDecrDisabled } = req.body;
    const id = products.length + 1; // Generate a unique ID for the product
    const newProduct = new Product(id, name, price, stock, quantity, isDecrDisabled);
    products.push(newProduct);
    console.log(products);
    res.status(201).json(newProduct);
  }

  function addManyProducts(req, res) {
    const productsToAdd = req.body.products;
  
    if (!Array.isArray(productsToAdd) || productsToAdd.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }
  
    let addedProducts = [];
  
    productsToAdd.forEach(productInfo => {
      const { name, price, stock, quantity, isDecrDisabled } = productInfo;
      const id = products.length + 1; // Generate a unique ID for the product
      const newProduct = new Product(id, name, price, stock, quantity, isDecrDisabled);
      products.push(newProduct);
      addedProducts.push(newProduct);
    });
  
    console.log("All products:", products);
  
    res.status(201).json({ message: "Products added successfully", addedProducts });
  }
  

  // Function to view all products
function viewProducts(req, res) {
    res.json(products);
  }

  // Function to add a product to the user's cart
function addToCart(req, res) {
    const productId = req.params.id;
    const product = products.find(p => p.id === parseInt(productId));
    product.quantity = req.body.quantity;
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  
    // Check if the user is authenticated
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    const username = decoded.username;
  
    // Find the user and add the product to their cart
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.cart) {
      user.cart = [];
    }
      // Determine quantity to add to cart
    const quantity = req.body.quantity <= 0 ? 1 : req.body.quantity;
   // Check if the product already exists in the cart
  const existingProductIndex = user.cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    // Product already exists, update its quantity
    user.cart[existingProductIndex].quantity = quantity;
  } else {
    // Product does not exist, add it to the cart
    product.quantity = quantity;
    user.cart.push(product);
  }
  
    res.json({ message: "Product added to cart successfully" });
  }
  

  // Function to view products in the user's cart
  function viewCart(req, res) {
    // Check if the user is authenticated
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    const username = decoded.username;
  
    // Find the user and return their cart
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.cart) {
      user.cart = [];
    }
    res.json(user.cart);
  }
  
  function buyProduct(req, res) {
    const productId = req.params.id;
    const product = products.find(p => p.id === parseInt(productId));
    console.log(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Check if the user is authenticated
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    const username = decoded.username;
    console.log(users);
    // Implement buying logic: Add product to the user's cart or process payment
    // For simplicity, let's assume we're just adding the product to the user's cart
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.cart) {
        user.cart = [];
      }
    // Implement buying logic: Add product to the user's cart or process payment
    // For simplicity, let's assume we're just adding the product to the user's cart
    user.cart.push(product);

    res.json({ message: "Product added to cart successfully" });
  }

  // Function to buy products in the user's cart
function buyCart(req, res) {
    // Check if the user is authenticated
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    const username = decoded.username;
  
    // Find the user and their cart
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
  
    // Implement buying logic for each product in the cart
    // For simplicity, let's assume we're just processing the payment
    // You can replace this with your actual logic
    // Clear the cart after processing the purchase
    user.cart = [];
    res.json({ message: "Purchase completed successfully" });
  }

  function removeFromCart(req, res) {
    // Check if the user is authenticated
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    const username = decoded.username;
  
    // Find the user and their cart
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const productId = req.params.id;
    const productIndex = user.cart.findIndex(p => p.id === parseInt(productId));
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

  // Set the product quantity to 0 before removing it from the cart
  user.cart[productIndex].quantity = 0;

    // Remove the product from the user's cart
    user.cart.splice(productIndex, 1);
  
    res.json({ message: "Product removed from cart successfully" });
}
  
  export { login, getUsers, register, addProduct, addManyProducts, viewProducts, viewCart, addToCart , buyProduct, buyCart, removeFromCart};

