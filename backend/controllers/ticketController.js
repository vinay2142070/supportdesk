
const Ticket = require('../models/ticketModel')

const expressAsyncHandler = require("express-async-handler")


const listTicketsController = expressAsyncHandler(async (req, res) => {

    const tickets = await Ticket.find({ userid: req.user.id })
    res.json(tickets)
})



const createTicketController = expressAsyncHandler(async (req, res) => {
    const { product, description, status } = req.body
    if (!product || !description) {
        res.status(400).json({ message: "product or description is mandatory" })
    }
    const ticket = await Ticket.create({ userid: req.user.id, product, description, status: 'new' })
    res.status(201).json(
        ticket
    )
})


const getTicketByIDController = expressAsyncHandler(async (req, res) => {
    const ticketID = req.params.id

    const ticket = await Ticket.findById(ticketID)
    if (!ticket) {
        return res.status(404).json({
            message: "ticket not found"
        })
    }
    res.status(200).json(
        ticket
    )
})


const deleteTicketByIDController = expressAsyncHandler(async (req, res) => {
    const ticketID = req.params.id

    const ticket = await Ticket.findByIdAndDelete(ticketID)
    console.log(ticket);

    if (!ticket) {
        return res.status(404).json({
            success: false,

        })
    }

    res.status(200).json({
        success: true,
        ticket
    })
})


const updateTicketByIDController = expressAsyncHandler(async (req, res) => {
    const ticketID = req.params.id

    //TODO check with ticket and userid
    const ticket = await Ticket.findByIdAndUpdate(ticketID, req.body, { new: true })


    if (!ticket) {
        return res.status(404).json({
            success: false,
        })
    }

    res.status(200).json({
        success: true,
        ticket
    })
})


module.exports = {
    createTicketController, listTicketsController, getTicketByIDController,
    deleteTicketByIDController, updateTicketByIDController
}