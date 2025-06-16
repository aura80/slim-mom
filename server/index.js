// Express server setup
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const journalRoutes = require('./routes/dailyEntryRoutes');
const dailyIntakeRoutes = require('./routes/dailyIntakeRoutes');
const path = require("path");


const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://auradragan80:test@cluster0.0i5ioj4.mongodb.net/slim-mom-db";

const app = express();

app.use(
  cors({
    origin: [
      // process.env.FRONTEND_URL,
      "http://localhost:3000",
      // "https://aura80.github.io",
      "https://aura80.github.io/slim-mom",
      "https://slim-mom.up.railway.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/daily-intake', dailyIntakeRoutes);

// Define the port
const PORT = process.env.PORT || 5000;
// Define the MongoDB URI
// const MONGO_URI = process.env.MONGO_URI;  //  || 'mongodb://localhost:27017/slim-mom'

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send('Welcome to Slim Mom API - server works!');
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);