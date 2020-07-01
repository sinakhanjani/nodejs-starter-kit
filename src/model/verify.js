const mongoose = require('mongoose')
const message = require('../../helper/message.helper')

const verifySchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        validate(value) {
            if (value.length !== 11) {                
                throw new Error(message.phoneCondition.res)
            }
        }
    },
    code: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const Verify = mongoose.model('Verify', verifySchema)

module.exports = Verify