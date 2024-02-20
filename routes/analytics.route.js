const express = require('express');
const Analyticsrouter = express.Router();
const Product = require('../models/product');

// Gender analytics route
Analyticsrouter.get('/gender', async (req, res) => {
  try {
    const genderData = await Product.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 },
        },
      },
    ]);

    const labels = genderData.map((item) => item._id);
    const data = genderData.map((item) => item.count);

    res.json({
      labels,
      datasets: [
        {
          label: 'Gender Distribution',
          data,
          backgroundColor: ['blue', 'pink'],
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Category analytics route
Analyticsrouter.get('/category', async (req, res) => {
  try {
    const categoryData = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    const labels = categoryData.map((item) => item._id);
    const data = categoryData.map((item) => item.count);

    res.json({
      labels,
      datasets: [
        {
          label: 'Category Distribution',
          data,
          backgroundColor: ['green', 'orange', 'purple'],
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = Analyticsrouter;
