const express = require('express')
const basicAuth = require('../../middleware/basicAuth')
const error = require('../../middleware/error')
const { get , add } = require('../admin/admin.controller')

const router = new express.Router()

router.get('/admin', basicAuth, get)
router.post('/admin/add', error ,add)

module.exports = router