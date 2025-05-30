require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();



// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling
app.use(errorHandler);