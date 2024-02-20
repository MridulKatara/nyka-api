const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product');

// Get all products with filtering, sorting, and pagination
productRouter.get('/products', async (req, res) => {
  try {
    const query = buildProductQuery(req.query);
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find(query)
      .sort({ price: req.query.sort === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single product by ID
productRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new product
productRouter.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a product by ID
productRouter.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a product by ID
productRouter.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Helper function to build product query based on query parameters
function buildProductQuery(queryParams) {
  const { search, gender, category } = queryParams;
  const query = {};

  if (search) {
    query.name = { $regex: new RegExp(search, 'i') };
  }

  if (gender) {
    query.gender = gender;
  }

  if (category) {
    query.category = category;
  }

  return query;
}

module.exports = productRouter;
