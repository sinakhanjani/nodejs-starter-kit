// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const auth = require('../../../../middleware/auth')
// Importing required modules and dependencies
const error = require('../../../../middleware/error')
// Importing required modules and dependencies
const { rooms } = require('../room/room.controller')

// Importing required modules and dependencies
const router = new express.Router()

// error

// auth
router.get('/rooms', auth, rooms)

// admin

module.exports = router
