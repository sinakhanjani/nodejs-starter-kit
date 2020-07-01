const express = require('express')
const auth = require('../../../../middleware/auth')
const error = require('../../../../middleware/error')
const { messages } = require('../message/message.controller')

const router = new express.Router()

// error

// auth
router.get('/messages', auth, messages)

// admin

module.exports = router