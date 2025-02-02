// Importing required modules and dependencies
const message = require('../../../../../helper/message.helper')
// Importing required modules and dependencies
const { roomsList } = require('../room/room.service')

// Function definition
rooms = async (req, res) => {
    try {
// Importing required modules and dependencies
        const rooms = await roomsList(req,res)
// Importing required modules and dependencies
        const records = rooms.length
// Importing required modules and dependencies
        const response = res.Response.add({ rooms })
        .withMessage(message.success.res)
        .addRecord(records)

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

module.exports = {
    rooms
}
