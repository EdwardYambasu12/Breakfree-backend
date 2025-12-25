const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();
const http = require("http")
const https = require('https');
const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    "http://192.168.165.23:8080",
    "https://breakfree-backend-w8jc.onrender.com",
    "www.breakfree-backend-w8jc.onrender.com",
    "https://www.breakfreeinternationalministry.com",
    "http://192.168.11.23:8080",
    "http://192.168.128.23:8081",
    "http://192.168.184.23:8080",
    "https://breakfree-healing.vercel.app"
  ],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect('mongodb+srv://sportsup14:a4gM6dGvo7SHk9aX@cluster0.db0ee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url}`);
  
  // Bypass all auth for now
  req.user = {
    _id: 'dev-user-id',
    email: 'breakfree2025@breakfreeinternationalministry.com',
    role: 'admin'
  };
  
  // Continue to next middleware
  next();
}); 
app.get('/ping', (req, res) => {
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Server is awake'
  });
});


const KEEP_ALIVE_URL = 'https://breakfree-backend-w8jc.onrender.com/ping';
const KEEP_ALIVE_INTERVAL = 60 * 1000; // 1 minute

let keepAliveCount = 0;
let lastKeepAliveSuccess = null;

const keepAlive = () => {
  const startTime = Date.now();
  
  https.get(KEEP_ALIVE_URL, (res) => {
    const responseTime = Date.now() - startTime;
    keepAliveCount++;
    lastKeepAliveSuccess = new Date();
    
    if (res.statusCode === 200) {
      console.log(`Keep-alive #${keepAliveCount} | Status: ${res.statusCode} | Response: ${responseTime}ms`);
    } else {
      console.log(`Keep-alive #${keepAliveCount} | Status: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Keep-alive #${keepAliveCount} failed:`, err.message);
  });
};

setTimeout(() => {
  console.log('Starting keep-alive system...');
  keepAlive();
  setInterval(keepAlive, KEEP_ALIVE_INTERVAL);
}, 30000);



// Routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/admin', require('./src/routes/admin.routes'));
app.use('/api', require('./src/routes/api.routes'));

// Error handling middleware
app.use(require('./src/middleware/error.middleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});