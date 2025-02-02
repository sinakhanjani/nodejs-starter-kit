// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const Service = require('./todo.service')

// Function definition
get = async (req, res) => {
    try {
// Importing required modules and dependencies
        const todos = await Service.get(req,res)
// Importing required modules and dependencies
        const records = todos.length
// Importing required modules and dependencies
        const response = res.Response.add({ todos })
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
        const todo = await Service.add(req,res)
// Importing required modules and dependencies
        const response = res.Response.add({ todo })

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
todo = async (req, res) => {
    try {
// Importing required modules and dependencies
        const _id = req.params.id
        if (!_id) {
// Importing required modules and dependencies
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }

// Importing required modules and dependencies
        const item = await Service.todo(req,res)

        if (!item) {
// Importing required modules and dependencies
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }

// Importing required modules and dependencies
        const response = res.Response.add({ todo: item })

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
todos = async (req, res) => {
    try {
// Importing required modules and dependencies
        const _id = req.params.id

        if (!_id) {
// Importing required modules and dependencies
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }

// Importing required modules and dependencies
        const todos = await Service.todos(req,res)

        if (!todos) {
// Importing required modules and dependencies
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }

// Importing required modules and dependencies
        const response = res.Response.add({ todos })

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
    todo,
    todos
}
