const express = require('express')
const auth = require('../../middleware/auth')
const admin = require('../../middleware/basicAuth')
const error = require('../../middleware/error')
const { add, get } = require('../purchase/purchase.controller')

const router = new express.Router()

// error
router.get('/purchase', error, get)

// auth

// admin
router.post('/purchase/add', admin, add)

module.exports = router