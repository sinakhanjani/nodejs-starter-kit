const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
    },
    authority: {
        type: String,
        required: true,
    },
    refId: {
        type: String,
    },
}, {
    timestamps: true
})

paymentSchema.methods.toJSON = function () {
    const payment = this
    const object = payment.toObject()

    delete object._id
    delete object.updatedAt
    delete object.createdAt
    delete object.__v

    return object
}

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment