const express = require('express');
const { PostFriend, GetFriend, GetIDFriend, PutIDFriend, DeleteIDFriend } = require('../controller/Friends');
const router = express.Router();

const authenticateToken = require('../middleware/middleware')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * paths:
 *   /api/friends:
 *     post:
 *       tags: [Friends]
 *       summary: Create a new friend
 *       security:
 *         - BearerAuth: []  # This indicates that BearerAuth is required for this endpoint
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *       responses:
 *         201:
 *           description: Friend created successfully
 *         400:
 *           description: Bad request - missing required fields
 *         500:
 *           description: Internal server error
 */
router.post('/', authenticateToken, PostFriend);

/**
 * @swagger
 * paths:
 *   /api/friends:
 *     get:
 *       tags: [Friends]
 *       summary: Retrieve a list of friends
 *       security:
 *         - BearerAuth: []  # This indicates that BearerAuth is required for this endpoint
 *       responses:
 *         200:
 *           description: A list of friends
 *         404:
 *           description: No friends found
 *         500:
 *           description: Internal server error
 */
router.get('/', authenticateToken, GetFriend);

/**
 * @swagger
 * paths:
 *   /api/friends/{id}:
 *     get:
 *       tags: [Friends]
 *       summary: Retrieve a friend by ID
 *       security:
 *         - BearerAuth: []  # This indicates that BearerAuth is required for this endpoint
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the friend to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: A friend object
 *         404:
 *           description: Friend not found
 *         500:
 *           description: Internal server error
 */
router.get('/:id', authenticateToken, GetIDFriend);

/**
 * @swagger
 * paths:
 *   /api/friends/{id}:
 *     put:
 *       tags: [Friends]
 *       summary: Update a friend's details by ID
 *       security:
 *         - BearerAuth: []  # This indicates that BearerAuth is required for this endpoint
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the friend to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *       responses:
 *         200:
 *           description: Friend updated successfully
 *         404:
 *           description: Friend not found
 *         500:
 *           description: Internal server error
 */
router.put('/:id', authenticateToken, PutIDFriend);

/**
 * @swagger
 * paths:
 *   /api/friends/{id}:
 *     delete:
 *       tags: [Friends]
 *       summary: Delete a friend by ID
 *       security:
 *         - BearerAuth: []  # This indicates that BearerAuth is required for this endpoint
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the friend to delete
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Friend deleted successfully
 *         404:
 *           description: Friend not found
 *         500:
 *           description: Internal server error
 */
router.delete('/:id', authenticateToken, DeleteIDFriend);

module.exports = router;
