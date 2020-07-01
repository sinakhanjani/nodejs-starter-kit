const mongoose = require('mongoose')
const message = require('../../../helper/message.helper')

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

todoSchema.methods.toJSON = function () {
    const todo = this
    const object = todo.toObject()

    object.taskId = todo.task

    delete object.updatedAt
    delete object.createdAt
    delete object.__v
    delete object.user
    delete object.task

    return object
}

const Task = mongoose.model('Todo', todoSchema)

module.exports = Task