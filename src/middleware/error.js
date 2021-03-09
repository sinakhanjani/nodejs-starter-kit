const Response = require('../model/Response')
const message = require('../../helper/message.helper')
const utils = require('../../helper/utils.helper')

const error = async (req, res, next) => {

    try {        
        res.Response = new Response()

        next()
    } catch (e) {
        const response = new Response().unSuccess(message.unknown.res)
        
        res
        .status(404)
        .send(response)
    }
}

module.exports = error