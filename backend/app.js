const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const errorMiddleware = require('./middlewares/errors');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });

const productRoutes = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// importing all routes
app.use('/api/products', productRoutes); // all routes starting with /api/products
app.use('/api', auth);
app.use('/api', payment);
app.use('/api/orders', order);

// Middlware to handle errors
app.use(errorMiddleware);

module.exports = app;
