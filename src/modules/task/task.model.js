const mongoose = require('mongoose')
const message = require('../../../helper/message.helper')
const Todo = require('../todo/todo.model')

const taskSchema = new mongoose.Schema({
    topic: String,
    description: String,
    check: Boolean,
    'user': {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        'ref': 'User'
    }
}, {
    timestamps: true
})

taskSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'task'
})

taskSchema.methods.toJSON = function () {
    const task = this
    const object = task.toObject()
    const userId = task.user
    
    object.userId = userId

    delete object.updatedAt
    delete object.createdAt
    delete object.__v
    delete object.user
    
    return object
}

// Delete todo when task is removed
taskSchema.pre('remove', async function (next) {
    const task = this
    await Todo.deleteMany({ task: task._id })
    
    next()
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task