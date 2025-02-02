// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const basicAuth = require('../../middleware/basicAuth')
// Importing required modules and dependencies
const error = require('../../middleware/error')
// Importing required modules and dependencies
const { get , add } = require('../admin/admin.controller')

// Importing required modules and dependencies
const router = new express.Router()

router.get('/admin', basicAuth, get)
router.post('/admin/add', error ,add)

module.exports = router
