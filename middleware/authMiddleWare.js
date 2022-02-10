const asyncHandler = require('express-async-handler');
const User = require('../backend/models/userModel');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authenticate = asyncHandler(async (req, res, next) => {
    try {
        token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.APP_SECRET)

        if (token) {

            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user);
            next()
        }
        else {
            res.status(401).json({ message: "Unauthorized" })
        }

    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }

})

module.exports = authenticate
