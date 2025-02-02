// Importing required modules and dependencies
const User = require('./user.model')
// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const { ObjectId } = require('mongodb')

class Service {
// Function definition
    static get = async (req,res) => {
// Importing required modules and dependencies
        const count = parseInt(req.query.count)
// Importing required modules and dependencies
        const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
        const users = await User.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })

        return users
    }

// Function definition
    static add = async (req,res) => {
// Importing required modules and dependencies
        const user = new User(req.body)

// Importing required modules and dependencies
        const file = req.file

        if (file) {
            user.recordJPG(file)
        }

        await user.save()

        return  user
    }

// Function definition
    static remove = async (req,res) => {
// Importing required modules and dependencies
        const user = await User.findOneAndDelete({ _id: req.params.id })

        if (!user) {
// Importing required modules and dependencies
            const response = res.Response.unSuccess(message.notFound.res)
            res.status(404).send(response)
        }

        return user
    }
}

module.exports = Service
