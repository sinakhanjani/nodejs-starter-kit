const config = require('config')
const Payment = require('../payment/payment.model')

class Service {
    static addPaymentRequest = async (req,res,bank) => {
        const payment = new Payment({
            authority: bank.authority,
            status: false,
            phone: (req.user) ? req.user.phone: config.get('Customer.zarinpal.phone'),
            amount: req.query.amount
        })
        /*
        {
          status: 100,
          authority: '000000000000000000000000000000088531',
          url: 'https://sandbox.zarinpal.com/pg/StartPay/000000000000000000000000000000088531'
        }   
        */
       const pay = await payment.save()

       return { pay, payment}
    }

    static checkPaymentVerification = async (req,res) => {

    }
}

module.exports = Service