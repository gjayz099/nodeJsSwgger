const { sequelize } = require('../db/connectionDb'); 
const { DataTypes } = require("sequelize");

// Define the Account model
const Account = sequelize.define('account', {
    
    // Username field
    Username: {
        type: DataTypes.STRING, // Define the data type as string
        allowNull: true,        // Allow null values
        unique: false,          // Not unique
    },
 
    // Password field
    Password: {
        type: DataTypes.STRING,  // Define the data type as string
        allowNull: true,         // Allow null values
    },
}, {
    timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
});

// Export the Account model
module.exports = Account;
