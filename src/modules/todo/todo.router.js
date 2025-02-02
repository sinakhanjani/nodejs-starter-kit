// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const auth = require('../../middleware/auth')
// Importing required modules and dependencies
const admin = require('../../middleware/basicAuth')
// Importing required modules and dependencies
const error = require('../../middleware/error')
// Importing required modules and dependencies
const { add, get , user , todo , todos } = require('../todo/todo.controller')

// Importing required modules and dependencies
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
