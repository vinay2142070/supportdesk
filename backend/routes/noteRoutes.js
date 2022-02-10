const express = require('express')
const { listNotesController, addNoteController } = require('../controllers/noteController')
const notesRouter = express.Router({ mergeParams: true })
const jwt = require('jsonwebtoken');
const authenticate = require('../../middleware/authMiddleWare')



notesRouter.get('/', authenticate, listNotesController)
notesRouter.post('/', authenticate, addNoteController)


module.exports = notesRouter