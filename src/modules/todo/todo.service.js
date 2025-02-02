// Importing required modules and dependencies
const Todo = require('./todo.model')
// Importing required modules and dependencies
const { ObjectId } = require('mongodb')

class Service {
// Function definition
    static get = async (req,res) => {
        try {
// Importing required modules and dependencies
            const count = parseInt(req.query.count)
// Importing required modules and dependencies
            const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
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

// Function definition
    static add = async (req,res) => {
        try {
// Importing required modules and dependencies
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

// Function definition
    static user = async (req,res) => {
        try {
// Importing required modules and dependencies
            const todo = await Todo.findById(req.params.id)
            await todo.populate('user').execPopulate()
// Importing required modules and dependencies
            const user = todo.user

            return user
        } catch (e) {
            throw new Error(e.message)
        }
    }

// Function definition
    static todo = async (req,res) => {
        try {
// Importing required modules and dependencies
            const _id = req.params.id
// Importing required modules and dependencies
            const item = await Todo.findOne({ _id, user: req.user._id })

            return item
        } catch (e) {
            throw new Error(e.message)
        }
    }

// Function definition
    static todos = async (req,res) => {
        try {
// Importing required modules and dependencies
            const _id = req.params.id
// Importing required modules and dependencies
            const todos = await Todo.find({ task: ObjectId(_id), user: req.user._id })

            return todos
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = Service
