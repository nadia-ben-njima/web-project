const express = require('express');
const cors = require('cors'); // Import cors
const mongoose = require('mongoose'); // Assuming you're using mongoose for MongoDB
const sellerRoute = require('./Routes/sellerRoute'); // Import routes for sellers
const shopperRoute = require('./Routes/shopperRoute'); // Import routes for shoppers
const dotenv = require('dotenv'); // Import dotenv to use environment variables

dotenv.config(); // Initialize dotenv

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware globally
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse incoming JSON requests

// Handle pre-flight requests (OPTIONS)
app.options('*', cors(corsOptions)); // Enable pre-flight requests for all routes

// Your routes
app.use('/api/seller', sellerRoute); // Register seller routes
app.use('/api/shopper', shopperRoute); // Register shopper routes
app.use('/api', productRoutes);
// Connect to MongoDB (using environment variable for sensitive data)
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Set up the server to listen
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
