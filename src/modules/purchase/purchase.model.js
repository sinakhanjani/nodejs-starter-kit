// Importing required modules and dependencies
const mongoose = require('mongoose')
// Importing required modules and dependencies
const message = require('../../../helper/message.helper')

// Importing required modules and dependencies
const purchaseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    }
}, {
    timestamps: true
})

// Importing required modules and dependencies
const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase
