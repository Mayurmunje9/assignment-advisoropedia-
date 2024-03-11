// Import required modules
const express = require("express");
const userRoutes = require("./routes/userRotes");
const cors = require("cors");
const dotenv = require('dotenv');
const connectToDb = require("./config/db");

// Load environment variables
dotenv.config();

// Log environment variables for debugging
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("NODE_MODE:", process.env.NODE_MODE);
console.log("PORT:", process.env.PORT);

// Initialize Express app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Log port for debugging
const port = process.env.PORT || 5000;
console.log("Port:", port);

// Routes
app.use('/api/auth/user', userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} Mode on port ${port}`);
});

// Connect to MongoDB
connectToDb();
