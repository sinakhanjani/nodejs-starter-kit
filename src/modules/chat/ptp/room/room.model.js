// Importing required modules and dependencies
const mongoose = require('mongoose')
// Importing required modules and dependencies
const message = require('../../../../../helper/message.helper')

// Importing required modules and dependencies
const roomSchema = new mongoose.Schema({
    'users': {
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
    }
}, {
    timestamps: true
})

const roomSchema.methods.toJSON = = () {
// Importing required modules and dependencies
    const room = this
// Importing required modules and dependencies
    const object = room.toObject()

    delete object.updatedAt
    delete object.createdAt
    delete object.__v

    return object
}

// Importing required modules and dependencies
const Room = mongoose.model('Room', roomSchema)

module.exports = Room
