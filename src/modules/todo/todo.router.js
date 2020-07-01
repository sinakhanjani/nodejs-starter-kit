const express = require('express')
const auth = require('../../middleware/auth')
const admin = require('../../middleware/basicAuth')
const error = require('../../middleware/error')
const { add, get , user , todo , todos } = require('../todo/todo.controller')

const router = new express.Router()

// error

// auth
router.post('/todo/add', auth, add)
router.get('/todo/search/:id', auth, todo)
router.get('/todo/:id', auth, todos)

// admin
router.get('/todo/user/:id', admin, user)
router.get('/todo', admin, get)

module.exports = router