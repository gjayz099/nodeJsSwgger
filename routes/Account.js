const express = require('express');
const { PostAccountSignUp, PostAccountLogin, PutAccountIdUpdate } = require('../controller/Account');
const router = express.Router();


/**
 * @swagger
 * /api/accounts/signup:
 *   post:
 *     tags: [Account]
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Bad request - missing required fields
 *       409:
 *         description: Conflict - username already taken
 *       500:
 *         description: Internal server error
 */
router.post('/signup', PostAccountSignUp);




/**
 * @swagger
 * /api/accounts/login:
 *   post:
 *     tags: [Account]
 *     summary: Login to an account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for accessing protected routes
 *                 account:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: Username of the logged-in account
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
router.post('/login', PostAccountLogin);


/**
 * @swagger
 * /api/accounts/update/{id}:
 *   put:  
 *     tags: [Account]
 *     summary: Update an existing account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the account to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required: 
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Friend updated successfully
 *       404:
 *         description: Friend not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', PutAccountIdUpdate);


module.exports = router;
