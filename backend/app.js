const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');

const errorMiddleware = require('./middlewares/errors');

const productRoutes = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// importing all routes
app.use('/api/products', productRoutes); // all routes starting with /api/products
app.use('/api', auth);
app.use('/api/orders', order);

// Middlware to handle errors
app.use(errorMiddleware);

module.exports = app;
