const Task = require('./task.model')
const message = require('../../../helper/message.helper')

get = async (req, res) => {
    try {        
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const tasks = await Task.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })
        const records = await Task.countDocuments()
        const response = res.generic.add({ tasks })
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
        const task = new Task({
            ...req.body,
            user: req.user._id
        })
        await task.save()
        const response = res.generic.add({ task })

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

user = async (req, res) => {
    try {
        if (!req.params.id) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }   

        const task = await Task.findById(req.params.id)                      
        await task.populate('user').execPopulate()
        const user = task.user
                
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

task = async (req, res) => {
    try {
        const _id = req.params.id
        if (!_id) {
            const response = res.generic.unknown()

            return res
            .status(500)
            .send(response)
        }   

        const task = await Task.findOne({ _id, user: req.user._id })
        await task.populate('todos').execPopulate()       
                 
        const todos = task.todos

        if (!task) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }
        
        const response = res.generic.add({ 
            task: {
                ...task.toJSON(),
                todos
            }
         })

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

tasks = async (req, res) => {
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

        if (!tasks) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }        
        const records = tasks.length
        const response = res.generic.add({ tasks }).addRecord(records)

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
    task,
    tasks
}