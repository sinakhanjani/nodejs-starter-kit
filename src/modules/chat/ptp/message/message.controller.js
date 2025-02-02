// Importing required modules and dependencies
const message = require('../../../../../helper/message.helper')
// Importing required modules and dependencies
const { serviceList } = require('./message.service')

// Function definition
messages = async (req, res) => {
    try {
// Importing required modules and dependencies
        const messages = await serviceList(req,res)
// Importing required modules and dependencies
        const records = messages.length
// Importing required modules and dependencies
        const response = res.Response.add({ messages })
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
    messages
}
