const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUserController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body


    if (await User.findOne({ email })) {

        res.status(400).json({ message: "Email already exists" })
    }
    else {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const user = await User.create({ name, email, password: passwordHash })
        const token = jwt.sign({ id: user._id }, process.env.APP_SECRET);


    }


})

const loginUserController = asyncHandler(async (req, res) => {

    const { email, password } = req.body;


    const user = await User.findOne({ email })

    console.log(bcrypt.compare(user.password, password));
    if (user.email === email && await bcrypt.compare(password, user.password)) {


        //return a jwt

        const token = jwt.sign({ id: user._id }, process.env.APP_SECRET);
        res.status(200).json({ "id": user._id, "email": user.email, "name": user.name, token })
    }
    else {
        res.status(400).json("Bad Credentials")
    }



})

module.exports = { registerUserController, loginUserController }

