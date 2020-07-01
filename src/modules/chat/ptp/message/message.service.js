const Message = require('./message.model')
const message = require('../../../../../helper/message.helper')

const serviceList = async (req, res) => {
    const count = parseInt(req.query.count)
    const index = Math.max(0, req.query.index)
    const roomId = req.query.roomId

    if (!roomId) {
        const response = res.generic.unSuccess(message.notFound.res)

        return res
        .status(500)
        .send(response)
    }

    const fetchs = await Message.find({
        room: roomId
    })
    .skip(count * index)
    .limit(count)
    .sort({
        name: 'asc'
    })

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