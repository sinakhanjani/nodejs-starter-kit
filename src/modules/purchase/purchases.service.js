// Importing required modules and dependencies
const Purchase = require('./purchase.model')

class Service {
// Function definition
    static purchases = async (req,res) => {
        try {
// Importing required modules and dependencies
            const count = parseInt(req.query.count)
// Importing required modules and dependencies
            const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
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

// Function definition
    static purchase = async (req,res) => {
        try {
// Importing required modules and dependencies
            const purchase = new Purchase(req.body)
            await purchase.save()

            return purchase
        } catch (e) {

        }
    }
}


module.exports = Service
