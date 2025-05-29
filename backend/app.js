require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

const cors = require('cors');
app.disable("x-powered-by");
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],}));

const cookieParser = require("cookie-parser");

const connectDB = require('./db/db');
connectDB();
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);


app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});