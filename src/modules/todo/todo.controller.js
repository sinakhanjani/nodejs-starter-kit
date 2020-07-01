const Todo = require('./todo.model')
const message = require('../../../helper/message.helper')
const { ObjectId } = require('mongodb')

get = async (req, res) => {
    try {        
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const todos = await Todo.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })
        const records = await Todo.countDocuments()
        const response = res.generic.add({ todos })
        .withMessage(message.success.res)
        .addRecord(records)
        
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

add = async (req, res) => {
    try {        
        const todo = new Todo({
            ...req.body,
            task: ObjectId(req.body.taskId),
            user: req.user._id
        })
        await todo.save()

        const response = res.generic.add({ todo })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()
console.log(e);

        res
        .status(500)
        .send(response)
    }
}

user = async (req, res) => {
    try {
        if (!req.params.id) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }   

        const todo = await Todo.findById(req.params.id)                      
        await todo.populate('user').execPopulate()
        const user = todo.user
                
        const response = res.generic.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

todo = async (req, res) => {
    try {
        const _id = req.params.id
        if (!_id) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }   

        const item = await Todo.findOne({ _id, user: req.user._id })  

        if (!item) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }
        
        const response = res.generic.add({ todo: item })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

todos = async (req, res) => {
    try {
        const _id = req.params.id
        
        if (!_id) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }   

        const todos = await Todo.find({ task: ObjectId(_id), user: req.user._id })  

        if (!todos) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }

        const response = res.generic.add({ todos })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

module.exports = {
    get,
    add,
    user,
    todo,
    todos
}