const Admin = require('./admin.model')
const message = require('../../../helper/message.helper')

class Service {
    static adminsList = async (req,res) => {
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const admins = await Admin.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })

        return admins
    }

    static addAdmin = async (req,res) => {
        const admin = new Admin(req.body)
        admin.username = admin.username.replace(/\s/g, '');
        await admin.save()           
        const token = await admin.generateBasicToken()

        return { admin, token }
    }
}

module.exports = Service