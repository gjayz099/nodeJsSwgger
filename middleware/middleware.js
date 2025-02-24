const jwt = require('jsonwebtoken')

// Import ENV File
require('dotenv').config()


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWTTOKEN , (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; 
        next(); 
    });
};

module.exports = authenticateToken