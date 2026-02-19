const express = require('express');
const router = express.Router();
const User = require('../schemas/User');
const Product = require('../schemas/Product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: 'user' // default role
    });

    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' });

    // Create token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey');
    res.header('auth-token', token).json({ token, user: { username: user.username, role: user.role, cart: user.cart } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to Cart
router.post('/cart', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(verified._id);
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');

    // Check if item already in cart
    const itemIndex = user.cart.findIndex(p => p.product.toString() === productId);
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Cart
router.get('/cart', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(verified._id).populate('cart.product');
    res.json(user.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create Admin (One-time setup route or similar)
router.post('/setup-admin', async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt); // Default admin password

    const admin = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created: admin / admin123' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
