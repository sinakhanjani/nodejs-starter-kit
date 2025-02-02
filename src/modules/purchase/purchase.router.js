// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const auth = require('../../middleware/auth')
// Importing required modules and dependencies
const admin = require('../../middleware/basicAuth')
// Importing required modules and dependencies
const error = require('../../middleware/error')
// Importing required modules and dependencies
const { add, get } = require('../purchase/purchase.controller')

// Importing required modules and dependencies
const router = new express.Router()

// error
router.get('/purchase', error, get)

// auth

// admin
router.post('/purchase/add', admin, add)

module.exports = router
