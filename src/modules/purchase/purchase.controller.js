const message = require('../../../helper/message.helper')
const Service = require('../purchase/purchases.service')

get = async (req, res) => {
    try {        
        const purchases =  await Service.purchases(req,res)
        const records = purchases.length
        const response = res.Response.add({ purchases })
        .withMessage(message.success.res)
        .addRecord(records)
        
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.Response.unknown()
        res
        .status(500)
        .send(response)
    }
}

add = async (req, res) => {
    try {        
        const purchase = await Service.purchase(req,res)
        const response = res.Response.add({ purchase })

        res
        .status(200)
        .send(response)
    } catch (e) {
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