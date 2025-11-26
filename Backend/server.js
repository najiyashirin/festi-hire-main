const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');


dotenv.config();


connectDB();

const app = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:8081', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: This origin is not allowed'));
  },
  credentials: true
}));


app.use('/uploads', express.static('uploads'));


app.use('/api/auth', require('./routes/authRoutes'));



app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});