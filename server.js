const express = require('express');
const { connectDb } = require('./db/connectionDb'); // Import database connection function
const swaggerDocs = require('./swagger'); // Import Swagger documentation setup
const friends = require('./routes/Friends'); // Import friends route handlers
const accounts = require('./routes/Account'); // Import accounts route handlers 

require('dotenv').config()
// Create an instance of the Express application
const app = express();
const port = process.env.PORT || 3000; // Define the port for the server



// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up the /api/friends route
app.use('/api/friends', friends);

// Set up the /api/accounts route
app.use('/api/accounts', accounts); 

// Initialize Swagger documentation
swaggerDocs(app, port);

// Start the server and connect to the database
app.listen(port, () => {
    connectDb(); // Connect to the database
    console.log(`Server is running on http://localhost:${port}`); // Log server status
});
