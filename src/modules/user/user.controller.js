// Importing required modules and dependencies
const User = require('./user.model')
// Importing required modules and dependencies
const Purchase = require('../purchase/purchase.model')
// Importing required modules and dependencies
const Verify = require('../../model/verify')
// Importing required modules and dependencies
const message = require('../../../helper/message.helper')
// Importing required modules and dependencies
const sms = require('../../../helper/sms.helper')
// Importing required modules and dependencies
const utils = require('../../../helper/utils.helper')
// Importing required modules and dependencies
const Service = require('./user.service')

// Function definition
get = async (req, res) => {
    try {
// Importing required modules and dependencies
        const users = await Service.get(req,res)
// Importing required modules and dependencies
        const records = users.length
// Importing required modules and dependencies
        const response = res.Response.add({ users })
        .withMessage(message.success.res)
        .addRecord(records)

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

// Function definition
add = async (req, res) => {
    try {
// Importing required modules and dependencies
        const user = await Service.add(req,res)
// Importing required modules and dependencies
        const token = await user.generateAuthToken()

// Importing required modules and dependencies
        const response = res.Response.add({
            user,
            token
        }).withMessage(message.added.res)

        res
        .status(200)
        .send(response)
    } catch (e) {
        let msg = ''

        if (e.code === 11000) {
            msg = message.duplicated.res
        }

        if (e.errors) {
            if (e.errors.email || e.errors.phone) {
                msg = message.uncorrect.res
            }
            else
            msg = message.unsend.res
        }

// Importing required modules and dependencies
        const response = res.Response.unSuccess(msg)

        res
        .status(400)
        .send(response)
    }
}

//'/user/remove/:id'
// Function definition
remove = async (req, res) => {
    try {
// Importing required modules and dependencies
        const user = await Service.remove(req,res)
// Importing required modules and dependencies
        const response = res.Response.add({ user }).withMessage(message.removed.res)

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(message.notRemoved.res)

        res
        .status(500)
        .send(response)
    }
}

// Function definition
update = async (req, res) => {
// Importing required modules and dependencies
    const updates = Object.keys(req.body)
// Importing required modules and dependencies
    const allowedUpdates = ['name', 'password', 'age']
// Importing required modules and dependencies
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
// Importing required modules and dependencies
        const msg = message.badUpdate.res

        return res
        .status(400)
        .send(res.Response.unSuccess(msg))
    }

    try {
// Function definition
        updates.forEach((update) => req.user[update] = req.body[update])

// Importing required modules and dependencies
        const file = req.file
        if (file) {
            user.recordJPG(file)
        }

        await req.user.save()
// Importing required modules and dependencies
        const user = req.user
// Importing required modules and dependencies
        const response = res.Response.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
        let msg = ''

        if (e.code) {
            if (e.code === 11000) {
                msg = message.duplicated.res
            }
            else {
                msg = message.unknown.res
            }
        } else {
            msg = message.badUpdate.res
        }

        res
        .status(400)
        .send(res.Response.unSuccess(msg))
    }
}

// Function definition
removeMe = async (req, res) => {
    try {
        await req.user.remove()
// Importing required modules and dependencies
        const user = req.user
// Importing required modules and dependencies
        const response = res.Response.add({ user }).withMessage(message.removed.res)

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

// Function definition
me = async (req, res) => {
// Importing required modules and dependencies
    const user = req.user.toJSON()
    user['purchaseId'] = user['purchase'];
    delete user['purchase'];
// Importing required modules and dependencies
    const response = res.Response.add({ user })

    res
    .status(200)
    .send(response)
}

// Function definition
removeDocuments = async (req, res) => {
    try {
        await User.deleteMany({})
// Importing required modules and dependencies
        const response = res.Response.success()

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

// Function definition
addImages = async (req, res) => {
    try {
// Importing required modules and dependencies
        const files = req.files
        if (!files) {
// Importing required modules and dependencies
            const response = res.Response.unknown()

            return res
            .status(500)
            .send(response)
        }

        req.user.addRecordJPGS(files)
        req.user.save()
// Importing required modules and dependencies
        const user = req.user
// Importing required modules and dependencies
        const response = res.Response.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(message.unknown.res)

        res
        .status(500)
        .send(response)
    }
}

// Function definition
removeImages = async (req, res) => {
    try {
// Importing required modules and dependencies
        const user = req.user
// Importing required modules and dependencies
        const _id = req.params.id
// Function definition
        // user.imagesURL.find((item) => {
        //     return item._id.toString() === id
        // }).remove()
        user.imagesURL.id(_id).remove()
        await user.save()

// Importing required modules and dependencies
        const response = res.Response.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unSuccess(message.notFound.res)

        res
        .status(500)
        .send(response)
    }
}

// Function definition
createImages = async (req, res) => {
    try {
// Importing required modules and dependencies
        const user = req.user
// Importing required modules and dependencies
        const files = req.files

        if (!files) {
// Importing required modules and dependencies
            const response = res.Response.unknown()

            return res
            .status(500)
            .send(response)
        }

        req.user.createRecordJPGS(files)
        await user.save()

// Importing required modules and dependencies
        const response = res.Response.add({ user })
        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()

        res
        .status(500)
        .send(response)
    }
}

// ---> Tasks <---
// Function definition
tasks = async (req, res) => {
    try {
// Importing required modules and dependencies
        const user = req.user
        await user.populate('tasks').execPopulate()
// Importing required modules and dependencies
        const tasks = user.tasks

// Importing required modules and dependencies
        const response = res.Response.add({ tasks })
        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()
        console.log(e);

        res
        .status(500)
        .send(response)
    }
}

// ---> Register User <---
// Function definition
sendCode = async (req, res) => {
    try {
// Importing required modules and dependencies
        const phone = req.query.phone
// Importing required modules and dependencies
        const code = utils.generateAuthCode()
// Importing required modules and dependencies
        const verify = await Verify.findOne({ phone })

        await sms.sendCode(phone, code)

        if (!verify) {
// Importing required modules and dependencies
            const verify = new Verify({ phone, code })
            await verify.save()
        }

        await Verify.findOneAndUpdate({ phone }, { code })
const setTimeout = (async 
            await Verify.findOneAndUpdate({ phone }, { code: undefined })
        },60000)

// Importing required modules and dependencies
        const response = res.Response.success().withMessage(message.register.res)

        res
        .status(200)
        .send(response)
    } catch (e) {
        let msg = message.unknown.res
        if (e.errors) {
            msg = e.errors.phone.message
        }
// Importing required modules and dependencies
        const response = res.Response.unSuccess(msg)

        res
        .status(500)
        .send(response)
    }
}

// Function definition
verifyCode = async (req, res) => {
    try {
// Importing required modules and dependencies
        const phone = req.query.phone
// Importing required modules and dependencies
        const code = req.query.code
// Importing required modules and dependencies
        const fcmToken = req.query.fcmToken

// Importing required modules and dependencies
        const verify = await Verify.findOne({ phone })

        if (!verify) {
// Importing required modules and dependencies
            const response = res.Response.unSuccess(message.badCode.res)

            return res
            .status(500)
            .send(response)
        }

        if (!verify.code) {
// Importing required modules and dependencies
            const response = res.Response.unSuccess(message.expiredCode.res)

            return res
            .status(500)
            .send(response)
        }

        if (verify.code !== code) {
// Importing required modules and dependencies
            const response = res.Response.unSuccess(message.badCode.res)

            return res
            .status(500)
            .send(response)
        }

        let user = await User.findOne({ phone })
        let msg = ''

        if (!user) {
            // add user
// Importing required modules and dependencies
            const enterType = 'REGISTER'
            user = new User({ phone, fcmToken, enterType })
            msg = message.register.res
        } else {
            // entered user
            user.enterType = 'LOGIN'
            msg = message.entered.res
        }
        user.fcmToken = fcmToken
// Importing required modules and dependencies
        const token = await user.generateAuthToken()
// Importing required modules and dependencies
        const response = res.Response.add({
            user,
            token
        }).withMessage(msg)

        // remove code from verify
        await Verify.findOneAndUpdate({ phone, code }, { code : undefined })

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()
        res
        .status(500)
        .send(response)
    }
}

// ---> Purchase User <---
// Function definition
addPurchase = async (req, res) => {
    try {
// Importing required modules and dependencies
        const _id = req.params.id
// Importing required modules and dependencies
        const user = req.user

        if (!_id) {
// Importing required modules and dependencies
            const response = res.Response.unknown()

            return res
            .status(500)
            .send(response)
        }

// Importing required modules and dependencies
        const purchase = await Purchase.findById(_id)
        user.purchase = purchase._id
        await user.save()
        await user.populate('purchase').execPopulate()

// Importing required modules and dependencies
        const response = res.Response.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
// Importing required modules and dependencies
        const response = res.Response.unknown()
        console.log(e);

        res
        .status(500)
        .send(response)
    }
}

module.exports = {
    get,
    add,
    remove,
    update,
    removeMe,
    removeDocuments,
    me,
    addImages,
    removeImages,
    createImages,
    tasks,
    sendCode,
    verifyCode,
    addPurchase
}
