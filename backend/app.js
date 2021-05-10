const express = require('express');
const app = express();

const productRoutes = require('./routes/product');

app.use(express.json());

// importing all routes
app.use('/api/products', productRoutes); // all routes starting with /api/products

module.exports = app;
