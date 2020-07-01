const mongoose = require('mongoose')
const message = require('../../../../../helper/message.helper')

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

roomSchema.methods.toJSON = function () {
    const room = this
    const object = room.toObject()

    delete object.updatedAt
    delete object.createdAt
    delete object.__v

    return object
}

const Room = mongoose.model('Room', roomSchema)

module.exports = Room