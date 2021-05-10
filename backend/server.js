const dotenv = require('dotenv');

const app = require('./app');
const connectDB = require('./config/database');
// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });

// Connecting to DB
connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server has started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
