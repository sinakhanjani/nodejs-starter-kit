const Task = require('./task.model')

class Service {

    static tasks = async (req,res) => {
        try {
            const count = parseInt(req.query.count)
            const index = Math.max(0, req.query.index)
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

    static addTask = async (req,res) => {
        try {
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

    static user = async (req,res) => {
        try {
            const task = await Task.findById(req.params.id)    
            await task.populate('user').execPopulate()
            const user = task.user
            return user
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static task = async (req,res) => {
        try {
            const _id = req.params.id
            const task = await Task.findOne({ _id, user: req.user._id })
            await task.populate('todos').execPopulate()       
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

    static userTasks = async (req,res) => {
        try {
            const check = req.query.check        
            const user = req.user
            const count = parseInt(req.query.count)
            const index = Math.max(0, req.query.index)
            const match = {}
            const sort = {}
    
            if (check) {            
                match.check = check === 'true'
            }
            // sortBy?createdAt:desc || asc
            // sortBy?check:desc || asc
            if (req.query.sortBy) {
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
            const tasks = user.tasks

            return tasks
        } catch (e) {
            throw new Error(e.message)
        }
    }
}



module.exports = Service