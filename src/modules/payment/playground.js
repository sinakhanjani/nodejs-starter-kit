// const zarinpal = require('../../../helper/zarinpal.helper')
// const message = require('../../../helper/message.helper')
// const config = require('config')
// const Payment = require('./payment.model')

// const paymentRequest = async (req, res, next) => {
    
//     if (!req.query.amount) {
//         const response = res.Response.unSuccess(message.badInput.res)
        
//         return res
//         .status(500)
//         .send(response)
//     }

//     zarinpal.PaymentRequest({
//         Amount: req.query.amount, // In Tomans
//         CallbackURL: config.get('Customer.zarinpal.redirectURL'),
//         Description: config.get('Customer.zarinpal.description'),
//         Email: config.get('Customer.zarinpal.email'),
//         Mobile: config.get('Customer.zarinpal.phone')
//       }).then(bank => {
//         /*
//         {
//           status: 100,
//           authority: '000000000000000000000000000000088531',
//           url: 'https://sandbox.zarinpal.com/pg/StartPay/000000000000000000000000000000088531'
//         }   
//         */
//         if (bank.status === 100) {
//             const payment = new Payment({
//                 authority: bank.authority,
//                 status: false,
//                 phone: (req.user) ? req.user.phone: config.get('Customer.zarinpal.phone'),
//                 amount: req.query.amount
//             })

//             payment.save().then((pay) => {
//                 const response = res.Response.add({
//                     payment: {
//                         ...payment.toJSON(),
//                         bankURL: bank.url,
//                         trackId: pay._id.toString()
//                     }
//                 })
            
//                 return res
//                 .status(200)
//                 .send(response)
//             })
//         }
//     }).catch(err => {
//         const response = res.Response.unknown()

//         return res
//         .status(message.unknown.code)
//         .send(response)
//     });
// }

// const paymentVerification = async (req, res, next) => {
//     if (!req.query.trackId) {
//         const response = res.Response.unSuccess(message.badInput.res)

//         return res
//         .status(500)
//         .send(response)
//     }
//     Payment.findById({ _id: req.query.trackId }).then((pay) => {
//         zarinpal.PaymentVerification({
//             Amount: pay.amount, // In Tomans
//             Authority: pay.authority,
//           }).then(bank => {
//               //
//             /* 
//             { 
//               status: -21, 
//               RefID: 0
//             } 
//             */
//             if (bank.status !== 100 && bank.status !== 101) {
//                 const msg = error(bank.status)
//                 const response = res.Response.unSuccess(msg)
    
//                 res
//                 .status(400)
//                 .send(response)
//             } else {
//                 pay.status = true
//                 pay.save()

//                 const response = res.Response.add({
//                     payment: {
//                         ...pay.toJSON(),
//                         refId: bank.RefID,
//                         trackId: pay._id.toString()
//                     }
//                 }).withMessage(`success payment with a trackId: ${pay._id.toString()}, refId: ${bank.RefID}`)

//                 res
//                 .status(200)
//                 .send(response) 
//             }
    
//         }).catch(err => {
//             console.error(err)
//         });
//     })
// }

// const unverifiedTransactions = async (req, res, next) => {
//     zarinpal.UnverifiedTransactions().then((response) => {

//         if (response.status === 100) {
//             console.log(response.authorities)
//         }

//     }).catch(err => {
//         console.error(err)
//     })
// }

// module.exports = {
//     paymentRequest,
//     paymentVerification,
//     unverifiedTransactions
// }
