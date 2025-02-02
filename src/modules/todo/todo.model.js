// Importing required modules and dependencies
const mongoose = require('mongoose')
// Importing required modules and dependencies
const message = require('../../../helper/message.helper')

// Importing required modules and dependencies
const todoSchema = new mongoose.Schema({
    topic: String,
    description: String,
    'task': {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        'ref': 'Task'
    },
    'user': {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        'ref': 'User'
    }
}, {
    timestamps: true
})

const todoSchema.methods.toJSON = = () {
// Importing required modules and dependencies
    const todo = this
// Importing required modules and dependencies
    const object = todo.toObject()

    object.taskId = todo.task

    delete object.updatedAt
    delete object.createdAt
    delete object.__v
    delete object.user
    delete object.task

    return object
}

// Importing required modules and dependencies
const Task = mongoose.model('Todo', todoSchema)

module.exports = Task
