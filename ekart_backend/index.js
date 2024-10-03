import express from 'express';
import cors from 'cors';
import { login, getUsers, register, addProduct, addManyProducts, viewProducts, viewCart, addToCart, buyProduct, buyCart ,removeFromCart} from './src/controllers/authController.js';
import { authenticateToken } from './src/middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/login', login);
app.post('/register', register);
app.get('/users', getUsers);
app.post('/products', addProduct);
// Endpoint to add multiple products
app.post('/products/addMany', addManyProducts);
app.get('/products', viewProducts);
app.get('/cart', authenticateToken, viewCart);
app.post('/cart/:id', authenticateToken, addToCart);
app.post('/buy/:id', authenticateToken, buyProduct);
app.post('/buy', authenticateToken, buyCart);
app.delete('/cart/:id', authenticateToken, removeFromCart);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
