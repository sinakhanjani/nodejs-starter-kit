const Admin = require('./admin.model')
const message = require('../../../helper/message.helper')

get = async (req, res) => {
    try {        
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const admins = await Admin.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })
        const records = admins.length
        const response = res.generic.add({ admins })
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
    const admin = new Admin(req.body)

    try {
        admin.username = admin.username.replace(/\s/g, '');
        
        await admin.save()           
        const token = await admin.generateBasicToken()
        const response = res.generic.add({
            admin,
            token
        }).withMessage(message.added.res)
        
        res
        .status(201)
        .send(response)
    } catch (e) {        
        let msg = ''
        if (e.errors) {
            if (e.errors.password) {
                msg = e.errors.password.properties.message
            } else {
                msg = message.unknown.res
            }
        }
        if (e.code) {
            if (e.code === 11000) {
                msg = message.duplicated.res
            }
        }
        const response = res.generic.unSuccess(msg)

        res
        .status(400)
        .send(response)
    }
}

module.exports = {
    get,
    add
}