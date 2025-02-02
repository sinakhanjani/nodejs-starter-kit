// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const Service = require('../task/task.service')

// Function definition
get = async (req, res) => {
    try {
// Importing required modules and dependencies
        const tasks = await Service.tasks(req,res)
// Importing required modules and dependencies
        const records = tasks.length
// Importing required modules and dependencies
        const response = res.Response.add({ tasks })
        .withMessage(message.success.res)
        .addRecord(records)

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

// Function definition
add = async (req, res) => {
    try {
// Importing required modules and dependencies
        const task = await Service.addTask(req,res)
// Importing required modules and dependencies
        const response = res.Response.add({ task })

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

// Function definition
user = async (req, res) => {
    try {
        if (!req.params.id) {
// Importing required modules and dependencies
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }

// Importing required modules and dependencies
        const user = await Service.user(req,res)
// Importing required modules and dependencies
        const response = res.Response.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

// Function definition
task = async (req, res) => {
    try {
// Importing required modules and dependencies
        const _id = req.params.id
        if (!_id) {
// Importing required modules and dependencies
            const response = res.Response.unknown()

            return res
            .status(500)
            .send(response)
        }
// Importing required modules and dependencies
        const task = await Service.task(req,res)

        if (!task) {
// Importing required modules and dependencies
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }

// Importing required modules and dependencies
        const response = res.Response.add(task)

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(e.message)

        res
        .status(500)
        .send(response)
    }
}

// Function definition
tasks = async (req, res) => {
    try {
// Importing required modules and dependencies
        const tasks = await Service.userTasks(req,res)

        if (!tasks) {
// Importing required modules and dependencies
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }
// Importing required modules and dependencies
        const records = tasks.length
// Importing required modules and dependencies
        const response = res.Response.add({ tasks }).addRecord(records)

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

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
