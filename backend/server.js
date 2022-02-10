const express = require('express');
const errorController = require('../middleware/errorController');
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const colors = require('colors')
const cors = require('cors')
const path = require('path')

connectDB()

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())




app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/ticket', require('./routes/ticketRoutes'))


// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
}


app.use(errorController)



app.listen(PORT, () => { console.log(`server started at port ${PORT}`) })