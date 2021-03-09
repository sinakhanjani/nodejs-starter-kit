const Todo = require('./todo.model')
const { ObjectId } = require('mongodb')

class Service {
    static get = async (req,res) => {
        try {
            const count = parseInt(req.query.count)
            const index = Math.max(0, req.query.index)
            const todos = await Todo.find({})
            .skip(count * index)
            .limit(count)
            .sort({
                name: 'asc'
            })

            return todos
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static add = async (req,res) => {
        try {
            const todo = new Todo({
                ...req.body,
                task: ObjectId(req.body.taskId),
                user: req.user._id
            })
            await todo.save()

            return todo
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static user = async (req,res) => {
        try {
            const todo = await Todo.findById(req.params.id)                      
            await todo.populate('user').execPopulate()
            const user = todo.user

            return user
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static todo = async (req,res) => {
        try {
            const _id = req.params.id
            const item = await Todo.findOne({ _id, user: req.user._id })  

            return item
        } catch (e) {
            throw new Error(e.message)
        }
    }
    
    static todos = async (req,res) => {
        try {
            const _id = req.params.id
            const todos = await Todo.find({ task: ObjectId(_id), user: req.user._id })  

            return todos
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = Service