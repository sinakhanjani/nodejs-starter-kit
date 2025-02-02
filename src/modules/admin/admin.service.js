// Importing required modules and dependencies
const Admin = require('./admin.model')
// Importing required modules and dependencies
const message = require('../../../helper/message.helper')

class Service {
// Function definition
    static adminsList = async (req,res) => {
// Importing required modules and dependencies
        const count = parseInt(req.query.count)
// Importing required modules and dependencies
        const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
        const admins = await Admin.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })

        return admins
    }

// Function definition
    static addAdmin = async (req,res) => {
// Importing required modules and dependencies
        const admin = new Admin(req.body)
        admin.username = admin.username.replace(/\s/g, '');
        await admin.save()
// Importing required modules and dependencies
        const token = await admin.generateBasicToken()

        return { admin, token }
    }
}

module.exports = Service
