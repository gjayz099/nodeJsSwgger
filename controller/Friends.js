const asyncHandler = require('express-async-handler')
const Friend = require('../model/Friends');
const { put } = require('../routes/Friends');


/**
 * POST: http://localhost:8080/api/friend 
 * @param : {
 *   "name": "name",
 *   "age": "age"
 * }
 */

// Function to handle POST requests for adding a new friend
const PostFriend = asyncHandler(async (req, res) => {
    // Try block to handle asynchronous operations
    try {
        // Destructure name and age from the request body
        const { name, age } = req.body;

        // Check if name and age are provided
        if (!name) {
            // If not, respond with a 400 Bad Request status and an error message
            return res.status(400).json({ msg: 'Name are required.' });
        }
        if (!age) {
            // If not, respond with a 400 Bad Request status and an error message
            return res.status(400).json({ msg: 'Age are required.' });
        }
        // Create a new friend object with the provided name and age
        const newFriend = {
            Name: name, // Assign name to the friend object
            Age: age    // Assign age to the friend object
        };

        // Create a new friend record in the database
        const friends = await Friend.create(newFriend);
        
        // Respond with a 201 Created status and the new friend object
        res.status(201).json({ friend: friends });
        
    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error Post friend:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

/*** GET: http://localhost:8080/api/friend */
// Function to handle GET requests for retrieving all friends
const GetFriend = asyncHandler(async (req, res) => {
    try {
        // Retrieve all friends from the database
        const friend = await Friend.findAll({});

        // Check if any friends were found
        if (!friend || friend.length === 0) {
            // If no friends found, respond with a 404 Not Found status and an error message
            return res.status(404).json({ msg: 'No friends found.' });
        }

        // Respond with a 200 OK status and the list of friends
        res.status(200).json({ friend });

    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error Get friend:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

/*** GET: http://localhost:8080/api/friend/:id */
// Function to handle GET requests for retrieving a friend by ID
const GetIDFriend = asyncHandler(async (req, res) => {
    try {
        // Get the friend ID from the request parameters
        const friend_id = req.params.id;

        // Find the friend in the database by the given ID
        const friend = await Friend.findByPk(friend_id);

        // Check if the friend was found
        if (!friend) {
            // If not found, respond with a 404 Not Found status and an error message
            return res.status(404).json({ message: `Cannot Find Friend ID ${friend_id}` });
        }

        // Respond with a 200 OK status and the found friend object
        res.status(200).json(friend);

    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error Get one friend:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

/*** PUT: http://localhost:8080/api/friend/:id */
// Function to handle PUT requests for updating a friend by ID
const PutIDFriend = asyncHandler(async (req, res) => {
    try {
        // Get the friend ID from the request parameters
        const friend_id = req.params.id;

        // Find the friend in the database by the given ID
        const friend = await Friend.findByPk(friend_id);

        // Check if the friend was found
        if (!friend) {
            // If not found, respond with a 404 Not Found status and an error message
            return res.status(404).json({ message: `Cannot find friend with ID ${friend_id}` });
        }

        // Destructure name and age from the request body
        const { name, age } = req.body;

        // Check if name and age are provided
        if (!name) {
            // If not, respond with a 400 Bad Request status and an error message
            return res.status(400).json({ msg: 'Name are required.' });
        }
        if (!age) {
            // If not, respond with a 400 Bad Request status and an error message
            return res.status(400).json({ msg: 'Age are required.' });
        }
        //

        // Create a new friend object with updated details
        const newFriend = {
            Name: name, // Update name
            Age: age    // Update age
        };

        // Update the friend record in the database
        await friend.update(newFriend);

        // Respond with a 200 OK status and the updated friend object
        res.status(200).json({ friend: newFriend });

    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error updating friend:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: error.message || "Internal server error" });
    }
});

/*** DELETE: http://localhost:8080/api/friend/:id */
// Function to handle DELETE requests for removing a friend by ID
const DeleteIDFriend = asyncHandler(async (req, res) => {
    try {
        // Get the friend ID from the request parameters
        const friend_id = req.params.id;

        // Find the friend in the database by the given ID
        const friend = await Friend.findByPk(friend_id);
        
        // Check if the friend was found
        if (!friend) {
            // If not found, respond with a 404 Not Found status and an error message
            return res.status(404).json({ message: `Cannot find friend with ID ${friend_id}` });
        }

        // Remove the friend record from the database
        await friend.destroy();

        // Respond with a 200 OK status and a success message
        res.status(200).json({ message: "Friend successfully deleted" });

    } catch (error) {
        // Log any errors that occur during the try block
        console.error('Error deleting friend:', error);
        // Respond with a 500 Internal Server Error status and an error message
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = {PostFriend, GetFriend, GetIDFriend, PutIDFriend, DeleteIDFriend}
