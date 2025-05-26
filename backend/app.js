require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const connectDB = require('./db/db');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
app.disable("x-powered-by");

connectDB();

// 1) Strictly whitelist your client origin (no "*")
const CLIENT_URL = process.env.CLIENT_URL || 'https://jewels-ebon.vercel.app';

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,                // allow session cookies from browser to pass through
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// 2) Enable CORS pre-flight across the board
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight handler

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
