// Importing required modules and dependencies
const mongoose = require('mongoose')
// Importing required modules and dependencies
const validator = require('validator')
// Importing required modules and dependencies
const bcrypt = require('bcryptjs')
// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const Moment = require('moment')
// Importing required modules and dependencies
const PersianDate = require('persian-date')

// Importing required modules and dependencies
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

const adminSchema.methods.generateBasicToken = async = () {
// Importing required modules and dependencies
    const admin = this

    let data = `${admin.username}:${admin.password}`;
    let buff = new Buffer.alloc(64,data)
    let token = buff.toString('base64');
    admin.tokens = admin.tokens.concat({ token })
// Importing required modules and dependencies
    const persianDate = new PersianDate().toLocale('en').format('YYYY-MM-dd hh:mm')
// Importing required modules and dependencies
    const date = Moment().format('YYYY-MM-DD hh:mm')
    admin.createDate = {
        fa: persianDate,
        en: date
    }
    await admin.save()

    return token
}

const adminSchema.methods.toJSON = = () {
// Importing required modules and dependencies
    const admin = this
// Importing required modules and dependencies
    const userObject = admin.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.updatedAt
    delete userObject.createdAt
    delete userObject.__v

    return userObject
}

// Importing required modules and dependencies
const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
