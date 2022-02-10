const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User