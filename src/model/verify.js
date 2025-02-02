// Importing required modules and dependencies
const mongoose = require('mongoose')
// Importing required modules and dependencies
const message = require('../../helper/message.helper')

// Importing required modules and dependencies
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

// Importing required modules and dependencies
const Verify = mongoose.model('Verify', verifySchema)

module.exports = Verify
