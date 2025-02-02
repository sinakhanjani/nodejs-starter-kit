// Importing required modules and dependencies
const Admin = require('../modules/admin/admin.model')
// Importing required modules and dependencies
const Response = require('../model/Response')
// Importing required modules and dependencies
const message = require('../../helper/message.helper')
// Importing required modules and dependencies
const error = require('../middleware/error')
// Importing required modules and dependencies
const utils = require('../../helper/utils.helper')

// Importing required modules and dependencies
const basicAuth = async (req, res, next) => {

    try {
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
// Importing required modules and dependencies
        const response = new Response().unSuccess(message.authenticate.res)
        return res.status(401).send(response)
    }

    // verify auth credentials
// Importing required modules and dependencies
    const token = req.headers.authorization.split(' ')[1];
// Importing required modules and dependencies
    const credentials = Buffer.from(token, 'base64').toString('ascii');
// Importing required modules and dependencies
    const [username, password] = credentials.split(':');
// Importing required modules and dependencies
    const admin = await Admin.findOne({ username, password })

    if (!admin) {
// Importing required modules and dependencies
        const response = new Response().unSuccess(message.adminAuthErr.res)

        return res
        .status(401)
        .send(response)
    }

    req.basicToken = token
    req.admin = admin

    await error(req,res,next)
} catch (e) {
// Importing required modules and dependencies
        const response = new Response().unSuccess(message.authenticate.res)
        res.status(401).send(response)
    }
}

module.exports = basicAuth;
