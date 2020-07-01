const Generic = require('../model/generic')
const message = require('../../helper/message.helper')
const utils = require('../../helper/utils.helper')

const error = async (req, res, next) => {

    try {        
        res.generic = Generic

        next()
    } catch (e) {
        const response = Generic.unSuccess(message.unknown.res)
        
        res
        .status(404)
        .send(response)
    }
}

module.exports = error