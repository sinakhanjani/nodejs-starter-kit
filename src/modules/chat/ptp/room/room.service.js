// Importing required modules and dependencies
const Room = require('./room.model')

// Importing required modules and dependencies
const roomsList = async (req, res) => {
// Importing required modules and dependencies
    const count = parseInt(req.query.count)
// Importing required modules and dependencies
    const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
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

// Importing required modules and dependencies
    const rooms = fetchs.map((room) => {
// Importing required modules and dependencies
        const users = {
            sender: {
                _id: room.users.sender._id,
                name: (room.users.sender.name) ? room.users.sender.name:'no.name',
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

        return {  _id: room._id, users }
    })

    return rooms
}

module.exports = {
    roomsList
}
