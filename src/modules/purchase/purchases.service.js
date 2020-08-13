const Purchase = require('./purchase.model')

class Service {

    static purchases = async (req,res) => {
        try {
            const count = parseInt(req.query.count)
            const index = Math.max(0, req.query.index)
            const purchases = await Purchase.find({})
            .skip(count * index)
            .limit(count)
            .sort({
                name: 'asc'
            })

            return purchases
        } catch (e) {

        }
    }

    static purchase = async (req,res) => {
        try {
            const purchase = new Purchase(req.body)
            await purchase.save()

            return purchase
        } catch (e) {

        }
    }
}


module.exports = Service