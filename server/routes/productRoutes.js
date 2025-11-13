const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET - Get all products
router.get('/get-products', async (req, res) => {
  try {
    const { category, inStock } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
});

// GET - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      error: 'Failed to fetch product',
      message: error.message 
    });
  }
});

// POST - Create new product (admin only - add authentication later)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description, inStock, image, specifications } = req.body;

    // Validate required fields
    if (!name || !category || !price || !description) {
      return res.status(400).json({ 
        error: 'Name, category, price, and description are required fields' 
      });
    }

    const product = new Product({
      name,
      category,
      price,
      description,
      inStock: inStock !== undefined ? inStock : true,
      image: image || '🌾',
      specifications
    });

    await product.save();

    res.status(201).json({ 
      message: 'Product created successfully',
      product 
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      error: 'Failed to create product',
      message: error.message 
    });
  }
});

// PUT - Update product
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, description, inStock, image, specifications } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, description, inStock, image, specifications },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      error: 'Failed to update product',
      message: error.message 
    });
  }
});

// DELETE - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ 
      message: 'Product deleted successfully',
      product 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      error: 'Failed to delete product',
      message: error.message 
    });
  }
});

module.exports = router;
