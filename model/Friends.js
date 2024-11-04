const { sequelize } = require('../db/connectionDb'); // Importing the Sequelize instance for database connection
const { DataTypes } = require("sequelize");


// Defining the Friends model
const Friends = sequelize.define('friends', {

    // Defining the 'Name' field
    Name: {
        type: DataTypes.STRING, // Specifies that this field will store strings

        allowNull: true, // Allows this field to be null (optional)
        unique: false,
        
    },
    // Defining the 'Age' field
    Age: {
        type: DataTypes.INTEGER, // Specifies that this field will store integers

        allowNull: true, // Allows this field to be null (optional)
    },
}, {
    timestamps: false, // Disable timestamps
});

// Exporting the Friends model for use in other parts of the application
module.exports = Friends
