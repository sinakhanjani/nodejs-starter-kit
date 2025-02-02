// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const Service = require('../admin/admin.service')

// Function definition
get = async (req, res) => {
    try {
// Importing required modules and dependencies
        const admins = await Service.adminsList(req,res)
// Importing required modules and dependencies
        const records = admins.length
// Importing required modules and dependencies
        const response = res.Response.add({ admins })
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
        const addAdmin = await Service.addAdmin(req,res)
// Importing required modules and dependencies
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
// Importing required modules and dependencies
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
