const message = require('../../../../../helper/message.helper')
const { roomsList } = require('../room/room.service')

rooms = async (req, res) => {
    try {        
        const rooms = await roomsList(req,res)
        const records = rooms.length
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