const message = require('../../../helper/message.helper')
const Service = require('../admin/admin.service')

get = async (req, res) => {
    try {        
        const admins = await Service.adminsList(req,res)
        const records = admins.length
        const response = res.Response.add({ admins })
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
        const addAdmin = await Service.addAdmin(req,res)
        const response = res.Response
        .add(addAdmin)
        .withMessage(message.added.res)
        
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
        const response = res.Response.unSuccess(msg)

        res
        .status(400)
        .send(response)
    }
}

module.exports = {
    get,
    add
}