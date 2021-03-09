const jwt = require('jsonwebtoken')
const User = require('../modules/user/user.model')
const Response = require('../model/Response')
const message = require('../../helper/message.helper')
const error = require('../middleware/error')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })        

        if (!user) {                        
            throw new Error('bad error')
        }
        
        req.token = token
        req.user = user

        await error(req,res,next)
    } catch (e) {        
        const response = new Response()
        .unSuccess(
            message
            .authenticate
            .res)
            
        res.status(401).send(response)
    }
}

module.exports = auth