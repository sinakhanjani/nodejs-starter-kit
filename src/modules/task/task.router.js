const express = require('express')
const auth = require('../../middleware/auth')
const admin = require('../../middleware/basicAuth')
const error = require('../../middleware/error')
const { add, get , user , task , tasks } = require('../task/task.controller')

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