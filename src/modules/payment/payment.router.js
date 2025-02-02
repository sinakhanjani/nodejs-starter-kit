// Importing required modules and dependencies
const express = require('express')
// Importing required modules and dependencies
const error = require('../../middleware/error')
// const auth = require('../../middleware/auth')
// const admin = require('../../middleware/basicAuth')
// Importing required modules and dependencies
const { paymentRequest, paymentVerification, unverifiedTransactions } = require('./payment.controller')

// Importing required modules and dependencies
const router = new express.Router()

// payment
router.get('/payment/request', error, paymentRequest)
router.get('/payment/verify', error, paymentVerification)

module.exports = router

