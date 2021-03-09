const User = require('./user.model')
const message = require('../../../helper/message.helper')
const { ObjectId } = require('mongodb')

class Service {
    static get = async (req,res) => {
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const users = await User.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })

        return users
    }

    static add = async (req,res) => {
        const user = new User(req.body)

        const file = req.file

        if (file) {
            user.recordJPG(file)
        }

        await user.save()

        return  user
    }

    static remove = async (req,res) => {
        const user = await User.findOneAndDelete({ _id: req.params.id })

        if (!user) {
            const response = res.Response.unSuccess(message.notFound.res)
            res.status(404).send(response)
        }

        return user
    }
}

module.exports = Service