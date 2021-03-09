const message = require('../../../helper/message.helper')
const Service = require('../payment/payment.service')

const paymentRequest = async (req, res) => {
    
    if (!req.query.amount) {
        const response = res.Response.unSuccess(message.badInput.res)
        
        return res
        .status(500)
        .send(response)
    }

    try {
        const { pay , payment, bank } = await Service.addPaymentRequest(req,res)

          if (bank.status === 100) {
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
        const response = res.Response.unknown()

        return res
        .status(message.unknown.code)
        .send(response)
    }
}

const paymentVerification = async (req, res, next) => {
    if (!req.query.trackId) {
        const response = res.Response.unSuccess(message.badInput.res)

        return res
        .status(500)
        .send(response)
    }
    try {
        const payment = await Service.checkPaymentVerification(req,res)
        const response = res.Response.add({
            payment
        }).withMessage(`success payment with a trackId: ${payment.trackId}, refId: ${payment.refId}`)
    
        res
        .status(200)
        .send(response)
    } catch(e) {
        const response = res.Response.unSuccess(e.message)
        console.log(e);
        return res
        .status(message.unknown.code)
        .send(response)
    }

}

const unverifiedTransactions = async (req, res, next) => {
    zarinpal.UnverifiedTransactions().then((response) => {

        if (response.status === 100) {
            console.log(response.authorities)
        }

    }).catch(err => {
        console.error(err)
    })
}

module.exports = {
    paymentRequest,
    paymentVerification,
    unverifiedTransactions
}