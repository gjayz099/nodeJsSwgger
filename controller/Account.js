const asyncHandler = require('express-async-handler')
const Account = require('../model/Account')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Import ENV File
require('dotenv').config()

// Function to create a new account object
const Data = (username, hashedPassword) => {
    return {
        Username: username, // Store the username
        Password: hashedPassword // Store the hashed password
    };
};
/*** POST: http://localhost:8080/api/acount/signup */
// Function to handle POST requests for account signup
const PostAccountSignUp = asyncHandler(async (req, res) => {
    try {
        // Destructure username and password from the request body
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username) {
            return res.status(400).json({ message: "Username are required." });
        }   
        if (!password) {
            return res.status(400).json({ message: "Password are required." });
        }

        // Check if the username is already taken
        const UsernameTaken = await Account.findOne({ where: { username: username } });
        if (UsernameTaken) {
            return res.status(409).json({ message: "This username is already taken." });
        }

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create a new account object
        const newAccount = Data(username, hashedPassword);

        // Save the new account to the database
        const createAccount = await Account.create(newAccount);

        // Respond with a 201 Created status and the created account
        res.status(201).json({   
            message: 'Signup Successful', 
            account: createAccount 
        });
    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error while creating account:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: "Internal server error" });
    }
});

// Function to generate a JWT token for a user
const generateToken = (account) => {
    return jwt.sign(
        {
            userName: account.username, // Include the username in the token payload
        },
        process.env.JWTTOKEN, // Use a secret for signing the token
        {
            expiresIn: '1h' // Set the token expiration time
        }
    );
};

/*** POST: http://localhost:8080/api/acount/login */
// Function to handle POST requests for account login
const PostAccountLogin = asyncHandler(async (req, res) => {
    try {
        // Destructure username and password from the request body
        const { username, password } = req.body;


        // Check if username and password are provided
        if (!username) {
            return res.status(400).json({ message: "Username are required." });
        }   
        if (!password) {
            return res.status(400).json({ message: "Password are required." });
        }
        
        // Find the account by username
        const account = await Account.findOne({ where: { username } });
        
        // Check if the account exists
        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, account.Password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Generate a token for the authenticated user
        const useToken = generateToken(account);
  
        // Respond with a 201 Created status and the token
        res.status(201).json({
            message: 'Login Successful',
            id: account.id,
            username: username,
            useToken // Include the generated token in the response
        });

    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error while logging in:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: "Internal server error" });
    }
});


/*** PUT: http://localhost:8080/api/account/update/:id */
// Function to handle PUT requests for updating a Account by ID
const PutAccountIdUpdate = asyncHandler(async (req, res) => {
    try {
        // Extract the account ID from the request parameters
        const account_id = req.params.id;

        // Find the account by its primary key (ID)
        const account = await Account.findByPk(account_id);
        // If the account is not found, respond with a 404 error
        if (!account) {
            return res.status(404).json({ message: `Cannot Find Any Account Admin ID ${account_id}` });
        }

        // Destructure username and password from the request body
        const { username, password } = req.body;

        // Define the number of salt rounds for hashing the password
        const saltRounds = 10;
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create an object to hold the updated account data
        const update_Account = Data(username, hashedPassword);

        // Update the account with the new data
        await account.update(update_Account);
 
        // Respond with a success message and the updated account information
        res.status(201).json({ message: 'Update Successful', friend: update_Account });

    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error while updating account:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = { PostAccountSignUp, PostAccountLogin, PutAccountIdUpdate }