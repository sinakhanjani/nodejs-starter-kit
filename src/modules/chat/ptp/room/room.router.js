const express = require('express')
const auth = require('../../../../middleware/auth')
const error = require('../../../../middleware/error')
const { rooms } = require('../room/room.controller')

const router = new express.Router()

// error

// auth
router.get('/rooms', auth, rooms)

// admin

module.exports = router