// Import the Sequelize library
const { Sequelize } = require("sequelize");

// Import ENV File
require('dotenv').config()

// Initialize a new Sequelize instance for connecting to a SQL Server database
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBHOST, // The hostname of the database server
  dialect: process.env.DBUSE, // The database dialect being used (Microsoft SQL Server)
  dialectOptions: {
      instanceName: process.env.DBINSNAME // The specific instance of SQL Server to connect to
  }
});

// Define an asynchronous function to connect to the database
const connectDb = async () => {
  try {
    // Attempt to authenticate and establish a connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.'); // Log success message
  } catch (error) {
    // If connection fails, log the error
    console.error('Unable to connect to the database:', error);
    throw error; // Re-throw the error for handling in the main file
  }
};

// Export the sequelize instance and connectDb function for use in other files
module.exports = {
  sequelize, 
  connectDb
}