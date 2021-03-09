const Admin = require('../modules/admin/admin.model')
const Response = require('../model/Response')
const message = require('../../helper/message.helper')
const error = require('../middleware/error')
const utils = require('../../helper/utils.helper')

const basicAuth = async (req, res, next) => {
    
    try {        
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        const response = new Response().unSuccess(message.authenticate.res)
        return res.status(401).send(response)
    }

    // verify auth credentials
    const token = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const admin = await Admin.findOne({ username, password })   

    if (!admin) {
        const response = new Response().unSuccess(message.adminAuthErr.res)

        return res
        .status(401)
        .send(response)
    }

    req.basicToken = token
    req.admin = admin

    await error(req,res,next)    
} catch (e) {         
        const response = new Response().unSuccess(message.authenticate.res)
        res.status(401).send(response)
    }
}

module.exports = basicAuth;
