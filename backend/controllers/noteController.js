const expressAsyncHandler = require("express-async-handler")

const Note = require('../models/noteModel')


const listNotesController = expressAsyncHandler(async (req, res) => {
    // const { ticketid } = req.params.ticketID

    const notes = await Note.find({ ticketid: req.params.ticketID })
    res.status(200).json(notes)
})


const addNoteController = expressAsyncHandler(async (req, res) => {
    const { text } = req.body

    if (!text) {
        res.status(400)
        throw new Error('please add text')
    }

    const note = await Note.create(
        {
            userid: req.user.id,
            ticketid: req.params.ticketID,
            text,

        })
    res.status(200).json(note)
})




module.exports = { listNotesController, addNoteController }