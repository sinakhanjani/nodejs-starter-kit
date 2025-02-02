// Importing required modules and dependencies
const mongoose = require('mongoose')
// Importing required modules and dependencies
const message = require('../../../../../helper/message.helper')

// Importing required modules and dependencies
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        'ref': 'Room'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        'ref': 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        'ref': 'User'
    }
}, {
    timestamps: true
})

const messageSchema.methods.toJSON = = () {
// Importing required modules and dependencies
    const msg = this
// Importing required modules and dependencies
    const object = msg.toObject()

    delete object.updatedAt
    delete object.createdAt
    delete object.__v

    return object
}

// Importing required modules and dependencies
const Message = mongoose.model('Message', messageSchema)

module.exports = Message
