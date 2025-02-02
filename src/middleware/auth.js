// Importing required modules and dependencies
const jwt = require('jsonwebtoken')
// Importing required modules and dependencies
const User = require('../modules/user/user.model')
// Importing required modules and dependencies
const Response = require('../model/Response')
// Importing required modules and dependencies
const message = require('../../helper/message.helper')
// Importing required modules and dependencies
const error = require('../middleware/error')

// Importing required modules and dependencies
const auth = async (req, res, next) => {

    try {
// Importing required modules and dependencies
        const token = req.header('Authorization').replace('Bearer ', '')
// Importing required modules and dependencies
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
// Importing required modules and dependencies
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error('bad error')
        }

        req.token = token
        req.user = user

        await error(req,res,next)
    } catch (e) {
// Importing required modules and dependencies
        const response = new Response()
        .unSuccess(
            message
            .authenticate
            .res)

        res.status(401).send(response)
    }
}

module.exports = auth
