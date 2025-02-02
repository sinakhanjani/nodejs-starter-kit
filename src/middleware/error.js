// Importing required modules and dependencies
const Response = require('../model/Response')
// Importing required modules and dependencies
const message = require('../../helper/message.helper')
// Importing required modules and dependencies
const utils = require('../../helper/utils.helper')

// Importing required modules and dependencies
const error = async (req, res, next) => {

    try {
        res.Response = new Response()

        next()
    } catch (e) {
// Importing required modules and dependencies
        const response = new Response().unSuccess(message.unknown.res)

        res
        .status(404)
        .send(response)
    }
}

module.exports = error
