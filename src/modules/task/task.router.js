// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const auth = require('../../middleware/auth')
// Importing required modules and dependencies
const admin = require('../../middleware/basicAuth')
// Importing required modules and dependencies
const error = require('../../middleware/error')
// Importing required modules and dependencies
const { add, get , user , task , tasks } = require('../task/task.controller')

// Importing required modules and dependencies
const router = new express.Router()

// error

// auth
router.post('/task/add', auth, add)
router.get('/task/search/:id', auth, task)
router.get('/tasks', auth, tasks)

// admin
router.get('/task/:id', admin, user)
router.get('/task', admin, get)

module.exports = router
