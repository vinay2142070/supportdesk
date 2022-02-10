const express = require('express')
const { registerUserController, loginUserController } = require('../controllers/userController')
const router = express.Router()
const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/authMiddleWare')



router.post('/register', registerUserController)

router.post('/login', loginUserController)



module.exports = router