const message = require('../../../helper/message.helper')
const Service = require('./todo.service')

get = async (req, res) => {
    try {        
        const todos = await Service.get(req,res)
        const records = todos.length
        const response = res.Response.add({ todos })
        .withMessage(message.success.res)
        .addRecord(records)
        
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

add = async (req, res) => {
    try {        
        const todo = await Service.add(req,res)
        const response = res.Response.add({ todo })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

user = async (req, res) => {
    try {
        if (!req.params.id) {
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }   

        const user = await Service.user(req,res)   
        const response = res.Response.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

todo = async (req, res) => {
    try {
        const _id = req.params.id
        if (!_id) {
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }   

        const item = await Service.todo(req,res) 

        if (!item) {
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }
        
        const response = res.Response.add({ todo: item })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

todos = async (req, res) => {
    try {
        const _id = req.params.id
        
        if (!_id) {
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }   

        const todos = await Service.todos(req,res)

        if (!todos) {
            const response = res.Response.notFound()

            return res
            .status(500)
            .send(response)
        }

        const response = res.Response.add({ todos })

        res
        .status(200)
        .send(response)
    } catch (e) {
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