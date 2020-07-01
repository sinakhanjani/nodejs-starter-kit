const mongoose = require('mongoose')
const message = require('../../../../../helper/message.helper')

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

messageSchema.methods.toJSON = function () {
    const msg = this
    const object = msg.toObject()

    delete object.updatedAt
    delete object.createdAt
    delete object.__v

    return object
}

const Message = mongoose.model('Message', messageSchema)

module.exports = Message