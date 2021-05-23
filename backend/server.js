const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

const app = require('./app');
const connectDB = require('./config/database');

// Handling uncaught exeption
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down server do to uncaught exception`);
  process.exit(1);
});

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connecting to DB
connectDB();

// Starting server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server has started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handling unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down server do to unhandled Promise rejections`);
  server.close(() => {
    process.exit(1);
  });
});
