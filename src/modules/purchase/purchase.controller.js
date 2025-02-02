// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const Service = require('../purchase/purchases.service')

// Function definition
get = async (req, res) => {
    try {
// Importing required modules and dependencies
        const purchases =  await Service.purchases(req,res)
// Importing required modules and dependencies
        const records = purchases.length
// Importing required modules and dependencies
        const response = res.Response.add({ purchases })
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

// Function definition
add = async (req, res) => {
    try {
// Importing required modules and dependencies
        const purchase = await Service.purchase(req,res)
// Importing required modules and dependencies
        const response = res.Response.add({ purchase })

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
    get,
    add
}
