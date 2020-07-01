const Message = require('./message.model')
const message = require('../../../../../helper/message.helper')
const { serviceList } = require('./message.service')

messages = async (req, res) => {
    try {        
        const messages = await serviceList(req,res)
        const records = messages.length
        const response = res.generic.add({ messages })
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
    messages
}