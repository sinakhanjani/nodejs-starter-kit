const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Moment = require('moment')
const PersianDate = require('persian-date')
const message = require('../../../helper/message.helper')
const Task = require('../task/task.model')
const compressJPG = require('../../../helper/sharp.helper')

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 11,
        validate(value) {
            if (!value.length === 11) {
                throw new Error(message.uncorrect.res)
            }
        }
    },
    name: {
        type: String,
        trim: true,
        default: ''
    },  
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(message.uncorrect.res)
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(message.badPassword.res)
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    enterType: String, 
    imageURL: {
        baseURL: String,
        thumbURL: String
    },
    imagesURL: [{
        baseURL: String,
        thumbURL: String
    }],
    fcmToken: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    createDate: {
        fa: String,
        en: String
    },
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        'ref': 'Purchase'
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.fcmToken
    delete userObject.updatedAt
    delete userObject.createdAt
    delete userObject.__v

    return userObject
}

userSchema.methods.recordJPG = function(file) {
    const user = this

    user.imageURL.thumbURL = compressJPG(file,300)            
    user.imageURL.baseURL = `/${file.path}`           
}

userSchema.methods.addRecordJPGS = function(files) {
    const user = this
    const imagesURL = files.map((file) => {
        const baseURL = `/${file.path}`
        const thumbURL = compressJPG(file,300)

        return { 
            baseURL,
            thumbURL
        }
    })

    user.imagesURL = imagesURL         
}

userSchema.methods.createRecordJPGS = function(files) {
    const user = this
    const imagesURL = files.map((file) => {
        const baseURL = `/${file.path}`
        const thumbURL = compressJPG(file,300)
        const imageURL = { 
            baseURL,
            thumbURL
        }

        return imageURL
    });

    user.imagesURL.push(...imagesURL)        
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })

    const persianDate = new PersianDate().toLocale('en').format('YYYY-MM-dd hh:mm')
    const date = Moment().format('YYYY-MM-DD hh:mm')
    user.createDate = {
        fa: persianDate,
        en: date
    }

    await user.save()

    return token
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    const persianDate = new PersianDate().toLocale('en').format('YYYY-MM-dd hh:mm')
    const date = Moment().format('YYYY-MM-DD hh:mm')
    user.createDate = {
        fa: persianDate,
        en: date
    }

    next()
})

// Delete user task when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ user: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User