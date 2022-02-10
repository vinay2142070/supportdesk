const express = require('express')
const { listTicketsController, createTicketController,
    getTicketByIDController, deleteTicketByIDController, updateTicketByIDController } = require('../controllers/ticketController')
const router = express.Router()
const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/authMiddleWare');
const notesRouter = require('./noteRoutes')

router.use('/:ticketID/notes', notesRouter)

router.route('/')
    .get(authenticate, listTicketsController)
    .post(authenticate, createTicketController)//('/register', registerUserController)
router.get('/:id', authenticate, getTicketByIDController)//('/register', registerUserController)
router.delete('/:id', authenticate, deleteTicketByIDController)//('/register', registerUserController)
router.put('/:id', authenticate, updateTicketByIDController)//('/register', registerUserController)

//router.post('/login', loginUserController)


module.exports = router