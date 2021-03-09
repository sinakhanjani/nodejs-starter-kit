const config = require('config')
const zarinpal = require('../../../helper/zarinpal.helper')
const Payment = require('../payment/payment.model')

class Service {
    static addPaymentRequest = async (req,res) => {
        const bank = await zarinpal.PaymentRequest({
            Amount: req.query.amount, // In Tomans
            CallbackURL: config.get('Customer.zarinpal.redirectURL'),
            Description: config.get('Customer.zarinpal.description'),
            Email: config.get('Customer.zarinpal.email'),
            Mobile: config.get('Customer.zarinpal.phone')
          })
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

       return { pay, payment, bank }
    }

    static checkPaymentVerification = async (req,res) => {
        const pay = await Payment.findById({ _id: req.query.trackId })
        const bank = await zarinpal.PaymentVerification({
            Amount: pay.amount, // In Tomans
            Authority: pay.authority,
        })
        /* 
        { 
            status: -21, 
            RefID: 0
        } 
        */
        if (bank.status !== 100 && bank.status !== 101) {
            const msg = error(bank.status)

            throw new Error(msg)
        } else {
            pay.status = true
            pay.save()

            return {
                payment: {
                    ...pay.toJSON(),
                    refId: bank.RefID,
                    trackId: pay._id.toString()
                }
            }
        }
    }
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

module.exports = Service