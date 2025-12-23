require('dotenv').config(); // ✅ ADD THIS AT THE VERY TOP

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const slugify = require('slugify');
const path = require('path');

const categoryRoutes = require('./routes/categories');
const articleRoutes = require('./routes/articles');

const app = express();

// Middleware
app.use(cors());
// If you want to restrict CORS using env:
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || '*'
// }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection - now uses .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/pages', require('./routes/pageRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});