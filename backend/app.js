const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

const productRoutes = require('./routes/product');

app.use(express.json());

// importing all routes
app.use('/api/products', productRoutes); // all routes starting with /api/products

// Middlware to handle errors
app.use(errorMiddleware);

module.exports = app;
