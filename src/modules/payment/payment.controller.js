const zarinpal = require('../../../helper/zarinpal.helper')
const message = require('../../../helper/message.helper')
const config = require('config')
const Payment = require('../payment/payment.model')

const paymentRequest = async (req, res, next) => {
    
    if (!req.query.amount) {
        const response = res.generic.unSuccess(message.badInput.res)
        
        return res
        .status(500)
        .send(response)
    }

    zarinpal.PaymentRequest({
        Amount: req.query.amount, // In Tomans
        CallbackURL: config.get('Customer.zarinpal.redirectURL'),
        Description: config.get('Customer.zarinpal.description'),
        Email: config.get('Customer.zarinpal.email'),
        Mobile: config.get('Customer.zarinpal.phone')
      }).then(bank => {
        /*
        {
          status: 100,
          authority: '000000000000000000000000000000088531',
          url: 'https://sandbox.zarinpal.com/pg/StartPay/000000000000000000000000000000088531'
        }   
        */
        if (bank.status === 100) {
            const payment = new Payment({
                authority: bank.authority,
                status: false,
                phone: (req.user) ? req.user.phone: config.get('Customer.zarinpal.phone'),
                amount: req.query.amount
            })

            payment.save().then((pay) => {
                const response = res.generic.add({
                    payment: {
                        ...payment.toJSON(),
                        bankURL: bank.url,
                        trackId: pay._id.toString()
                    }
                })
            
                return res
                .status(200)
                .send(response)
            })
        }
    }).catch(err => {
        const response = res.generic.unknown()

        return res
        .status(message.unknown.code)
        .send(response)
    });
}

const paymentVerification = async (req, res, next) => {
    if (!req.query.trackId) {
        const response = res.generic.unSuccess(message.badInput.res)

        return res
        .status(500)
        .send(response)
    }
    Payment.findById({ _id: req.query.trackId }).then((pay) => {
        zarinpal.PaymentVerification({
            Amount: pay.amount, // In Tomans
            Authority: pay.authority,
          }).then(bank => {
              //
            /* 
            { 
              status: -21, 
              RefID: 0
            } 
            */
            if (bank.status !== 100 && bank.status !== 101) {
                const msg = error(bank.status)
                const response = res.generic.unSuccess(msg)
    
                res
                .status(400)
                .send(response)
            } else {
                pay.status = true
                pay.save()

                const response = res.generic.add({
                    payment: {
                        ...pay.toJSON(),
                        refId: bank.RefID,
                        trackId: pay._id.toString()
                    }
                }).withMessage(`success payment with a trackId: ${pay._id.toString()}, refId: ${bank.RefID}`)

                res
                .status(200)
                .send(response) 
            }
    
        }).catch(err => {
            console.error(err)
        });
    })
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

const error = (errorCode) => {
    const errors = {
        '-1': 'اطلاعات ارسال شده ناقص است',
        '-2': 'و يا مرچنت كد پذيرنده صحيح نيست IP',
        '-3': 'با توجه به محدوديت های شاپرك امكان پرداخت با رقم درخواست شده ميسر نمی باشد',
        '-4': 'سطح تاييد پذيرنده پايين تر از سطح نقره ای است',
        '-11': 'درخواست مورد نظر يافت نشد',
        '-12': 'امكان ويرايش درخواست ميسر نمی باشد',
        '-21': 'هيچ نوع عمليات مالی برای اين تراكنش يافت نشد',
        '-22': 'تراكنش نا موفق ميباشد',
        '-33': 'رقم تراكنش با رقم پرداخت شده مطابقت ندارد',
        '-34': 'سقف تقسيم تراكنش از لحاظ تعداد يا رقم عبور نموده است',
        '-40': 'اجازه دسترسی به متد مربوطه وجود ندارد',
        '-41': 'اطلاعات ارسال شده مربوط به دیتای اضافی و غيرمعتبر ميباشد',
        '-42': 'مدت زمان معتبر طول عمر شناسه پرداخت بين سی دقيقه تا چهل و پنج روز مي باشد',
        '-54': 'درخواست مورد نظر آرشيو شده است',
        '101': 'عمليات پرداخت موفق بوده و قبلا پرداخت این تراكنش انجام شده است'
    }

    return errors[errorCode]
}
