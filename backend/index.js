const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); 
const sellerRoute = require('./Routes/sellerRoute');
const shopperRoute = require('./Routes/shopperRoute');
const productRoutes = require('./Routes/productRoutes');
const orderRoutes=require('./Routes/OrderRoute');
const dotenv = require('dotenv');
const Order = require('./models/Order');
const { postOrder } = require('./Controllers/orderController');

dotenv.config(); 

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
};


app.use(cors(corsOptions));
app.use(express.json()); 

// Serve static files from the "images" folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.options('*', cors(corsOptions)); // Enable pre-flight requests for all routes


app.use('/api/seller', sellerRoute); 
app.use('/api/shopper', shopperRoute); 
app.use('/api', productRoutes);
app.use('/api',postOrder);



mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 