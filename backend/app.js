const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');

const productRoutes = require('./routes/product');
const auth = require('./routes/auth');

app.use(express.json());
app.use(cookieParser());

// importing all routes
app.use('/api/products', productRoutes); // all routes starting with /api/products
app.use('/api', auth);

// Middlware to handle errors
app.use(errorMiddleware);

module.exports = app;
