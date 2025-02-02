// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const auth = require('../../../../middleware/auth')
// Importing required modules and dependencies
const error = require('../../../../middleware/error')
// Importing required modules and dependencies
const { messages } = require('../message/message.controller')

// Importing required modules and dependencies
const router = new express.Router()

// error

// auth
router.get('/messages', auth, messages)

// admin

module.exports = router
