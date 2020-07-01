const Purchase = require('./purchase.model')
const message = require('../../../helper/message.helper')
const { ObjectId } = require('mongodb')

get = async (req, res) => {
    try {        
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const purchases = await Purchase.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })
        const records = await Purchase.countDocuments()
        const response = res.generic.add({ purchases })
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

add = async (req, res) => {
    try {        
        const purchase = new Purchase(req.body)
        await purchase.save()

        const response = res.generic.add({ purchase })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()
console.log(e);

        res
        .status(500)
        .send(response)
    }
}

module.exports = {
    get,
    add
}