// Importing required modules and dependencies
const Message = require('./message.model')
// Importing required modules and dependencies
const message = require('../../../../../helper/message.helper')

// Importing required modules and dependencies
const serviceList = async (req, res) => {
// Importing required modules and dependencies
    const count = parseInt(req.query.count)
// Importing required modules and dependencies
    const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
    const roomId = req.query.roomId

    if (!roomId) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(message.notFound.res)

        return res
        .status(500)
        .send(response)
    }

// Importing required modules and dependencies
    const fetchs = await Message.find({
        room: roomId
    })
    .skip(count * index)
    .limit(count)
    .sort({
        name: 'asc'
    })

// Importing required modules and dependencies
    const messages = fetchs.map((msg) => {

        return {
             _id: msg._id,
             message: msg.message,
             owner: (msg.sender.toString() === req.user._id.toString()) ? 'me':'audience',
             senderId: msg.sender,
             receiverId: msg.receiver
        }
    })

    return messages
}

module.exports = {
    serviceList
}
