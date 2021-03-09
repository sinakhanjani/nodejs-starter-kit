const express = require('express')
const error = require('../../middleware/error')
// const auth = require('../../middleware/auth')
// const admin = require('../../middleware/basicAuth')
const { paymentRequest, paymentVerification, unverifiedTransactions } = require('./payment.controller')

const router = new express.Router()

// payment
router.get('/payment/request', error, paymentRequest)
router.get('/payment/verify', error, paymentVerification)

module.exports = router

