const Room = require('./room.model')
const message = require('../../../../../helper/message.helper')
const { ObjectId } = require('mongodb')

rooms = async (req, res) => {
    try {        
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const fetchs = await Room.find({ 
            $or: [
                { 'users.sender': req.user._id },
                { 'users.receiver': req.user._id }
            ]
        })
        .populate('users.sender')
        .populate('users.receiver')
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })
        .exec()

        const rooms = fetchs.map((room) => {            
            const users = {
                sender: {
                    _id: room.users.sender._id,
                    name: (room.users.sender.name) ? room.users.sender.name:'no name',
                    phone: room.users.sender.phone,
                    imageURL: room.users.sender.imageURL
                },
                receiver: {
                    _id: room.users.receiver._id,
                    name: (room.users.receiver.name) ? room.users.receiver.name:'no.name',
                    phone: room.users.receiver.phone,
                    imageURL: (room.users.receiver.imageURL) ? undefined:room.users.receiver.imageURL
                }
            }
            const _id = room._id
            return {  _id, users }
        })
        const records = fetchs.length
        const response = res.generic.add({ rooms })
        .withMessage(message.success.res)
        .addRecord(records)
        
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

module.exports = {
    rooms
}