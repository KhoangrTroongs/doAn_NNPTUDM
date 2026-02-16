const express = require('express');
const router = express.Router();
const Product = require('../schemas/Product');
const User = require('../schemas/User'); // Check dependency/auth logic later
const jwt = require('jsonwebtoken');
// Basic auth middleware
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Add product
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Admin only');
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: Update product
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Admin only');
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: Delete product
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Admin only');
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
