const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const message = require('../../../helper/message.helper')
const Moment = require('moment')
const PersianDate = require('persian-date')

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(message.badPassword.res)
            }
        }
    },
    createDate: {
        persian: {
            type: String
        },
        en: {
            type: String
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

adminSchema.methods.generateBasicToken = async function () {
    const admin = this

    let data = `${admin.username}:${admin.password}`;
    let buff = new Buffer.alloc(64,data)
    let token = buff.toString('base64');
    admin.tokens = admin.tokens.concat({ token })
    const persianDate = new PersianDate().toLocale('en').format('YYYY-MM-dd hh:mm')
    const date = Moment().format('YYYY-MM-DD hh:mm')
    admin.createDate = {
        fa: persianDate,
        en: date
    }
    await admin.save()
    
    return token
}

adminSchema.methods.toJSON = function () {
    const admin = this
    const userObject = admin.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.updatedAt
    delete userObject.createdAt
    delete userObject.__v

    return userObject
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin