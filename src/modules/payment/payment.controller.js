// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const Service = require('../payment/payment.service')

// Importing required modules and dependencies
const paymentRequest = async (req, res) => {

    if (!req.query.amount) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(message.badInput.res)

        return res
        .status(500)
        .send(response)
    }

    try {
// Importing required modules and dependencies
        const { pay , payment, bank } = await Service.addPaymentRequest(req,res)

          if (bank.status === 100) {
// Importing required modules and dependencies
            const response = res.Response.add({
                payment: {
                    ...payment.toJSON(),
                    bankURL: bank.url,
                    trackId: pay._id.toString()
                }
            })

            return res
            .status(200)
            .send(response)
        }
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        return res
        .status(message.unknown.code)
        .send(response)
    }
}

// Importing required modules and dependencies
const paymentVerification = async (req, res, next) => {
    if (!req.query.trackId) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(message.badInput.res)

        return res
        .status(500)
        .send(response)
    }
    try {
// Importing required modules and dependencies
        const payment = await Service.checkPaymentVerification(req,res)
// Importing required modules and dependencies
        const response = res.Response.add({
            payment
        }).withMessage(`success payment with a trackId: ${payment.trackId}, refId: ${payment.refId}`)

        res
        .status(200)
        .send(response)
    } catch(e) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(e.message)
        console.log(e);
        return res
        .status(message.unknown.code)
        .send(response)
    }

}

// Importing required modules and dependencies
const unverifiedTransactions = async (req, res, next) => {
// Function definition
    zarinpal.UnverifiedTransactions().then((response) => {

        if (response.status === 100) {
            console.log(response.authorities)
        }

// Function definition
    }).catch(err => {
        console.error(err)
    })
}

module.exports = {
    paymentRequest,
    paymentVerification,
    unverifiedTransactions
}
