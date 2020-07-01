const mongoose = require('mongoose')
const message = require('../../../helper/message.helper')

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

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase