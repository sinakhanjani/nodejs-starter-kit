// Importing required modules and dependencies
const Task = require('./task.model')

class Service {
// Function definition
    static tasks = async (req,res) => {
        try {
// Importing required modules and dependencies
            const count = parseInt(req.query.count)
// Importing required modules and dependencies
            const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
            const tasks = await Task.find({})
            .skip(count * index)
            .limit(count)
            .sort({
                name: 'asc'
            })

            return tasks
        } catch (e) {
            throw new Error(e.message)
        }
    }

// Function definition
    static addTask = async (req,res) => {
        try {
// Importing required modules and dependencies
            const task = new Task({
                ...req.body,
                user: req.user._id
            })
            await task.save()

            return task
        } catch (e) {
            throw new Error(e.message)
        }
    }

// Function definition
    static user = async (req,res) => {
        try {
// Importing required modules and dependencies
            const task = await Task.findById(req.params.id)
            await task.populate('user').execPopulate()
// Importing required modules and dependencies
            const user = task.user
            return user
        } catch (e) {
            throw new Error(e.message)
        }
    }

// Function definition
    static task = async (req,res) => {
        try {
// Importing required modules and dependencies
            const _id = req.params.id
// Importing required modules and dependencies
            const task = await Task.findOne({ _id, user: req.user._id })
            await task.populate('todos').execPopulate()
// Importing required modules and dependencies
            const todos = task.todos
            if (task) {
                return {
                    task: {
                        ...task.toJSON(),
                        todos
                    }
                 }
            }
        } catch (e) {
            throw new Error(e.message)
        }
    }

// Function definition
    static userTasks = async (req,res) => {
        try {
// Importing required modules and dependencies
            const check = req.query.check
// Importing required modules and dependencies
            const user = req.user
// Importing required modules and dependencies
            const count = parseInt(req.query.count)
// Importing required modules and dependencies
            const index = Math.max(0, req.query.index)
// Importing required modules and dependencies
            const match = {}
// Importing required modules and dependencies
            const sort = {}

            if (check) {
                match.check = check === 'true'
            }
            // sortBy?createdAt:desc || asc
            // sortBy?check:desc || asc
            if (req.query.sortBy) {
// Importing required modules and dependencies
                const parts = req.query.sortBy.split(':')
                sort[parts[0]] = parts[1] === 'desc' ? -1:1
            }

            await user.populate({
                path: 'tasks',
                // match: {
                //     check: match.check
                // }
                match,
                options: {
                    limit: parseInt(count),
                    skip: parseInt(count * index),
                    // sort: {
                    //     createdAt: -1 // reverse,
                    //     check: -1 // reverse check
                    // }
                    sort
                }
            }).execPopulate()
// Importing required modules and dependencies
            const tasks = user.tasks

            return tasks
        } catch (e) {
            throw new Error(e.message)
        }
    }
}



module.exports = Service
