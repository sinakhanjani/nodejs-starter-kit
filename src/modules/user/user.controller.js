const User = require('./user.model')
const Purchase = require('../purchase/purchase.model')
const Verify = require('../../model/verify')
const message = require('../../../helper/message.helper')
const sms = require('../../../helper/sms.helper')
const utils = require('../../../helper/utils.helper')

get = async (req, res) => {
    try {    
        const count = parseInt(req.query.count)
        const index = Math.max(0, req.query.index)
        const users = await User.find({})
        .skip(count * index)
        .limit(count)
        .sort({
            name: 'asc'
        })
        const records = users.length
        const response = res.generic.add({ users })
        .withMessage(message.success.res)
        .addRecord(records)
    
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

add = async (req, res) => {    
    const user = new User(req.body)
    
    try {
        const file = req.file

        if (file) {
            user.recordJPG(file)
        }

        await user.save()
        const token = await user.generateAuthToken()

        const response = res.generic.add({
            user,
            token
        }).withMessage(message.added.res)

        res
        .status(201)
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

        const response = res.generic.unSuccess(msg)
        
        res
        .status(400)
        .send(response)
    }
}

//'/user/remove/:id'
remove = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id })

        if (!user) {
            const response = res.generic.unSuccess(message.notFound.res)
            res.status(404).send(response)
        }

        const response = res.generic.add({ user }).withMessage(message.removed.res)

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unSuccess(message.notRemoved.res)

        res
        .status(500)
        .send(response)
    }
}

update = async (req, res) => {    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {        
        const msg = message.badUpdate.res
        
        return res
        .status(400)
        .send(res.generic.unSuccess(msg))
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        const file = req.file

        if (file) {    
            user.recordJPG(file)
        }

        await req.user.save()
        const user = req.user
        const response = res.generic.add({ user })

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
        .send(res.generic.unSuccess(msg))
    }
}

removeMe = async (req, res) => {
    try {
        await req.user.remove()
        const user = req.user
        const response = res.generic.add({ user }).withMessage(message.removed.res)

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

me = async (req, res) => {
    const user = req.user.toJSON()
    user['purchaseId'] = user['purchase'];
    delete user['purchase'];
    
    const response = res.generic.add({ user })

    res
    .status(200)
    .send(response)
}

removeDocuments = async (req, res) => {
    try {        
        await User.deleteMany({})
        const response = res.generic.success()

        res
        .status(200)
        .send(response)
    } catch (e) {                
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

addImages = async (req, res) => {
    try {
        const files = req.files    
        if (!files) {
            const response = res.generic.unknown()

            return res
            .status(500)
            .send(response)
        }    

        req.user.addRecordJPGS(files)
        req.user.save()
        const user = req.user
        const response = res.generic.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unSuccess(message.unknown.res)

        res
        .status(500)
        .send(response)
    }
}

removeImages = async (req, res) => {
    try {        
        const user = req.user
        const _id = req.params.id
        // user.imagesURL.find((item) => {
        //     return item._id.toString() === id
        // }).remove() 
        user.imagesURL.id(_id).remove()
        await user.save()
        
        const response = res.generic.add({ user })
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unSuccess(message.notFound.res)
        
        res
        .status(500)
        .send(response)
    }
}

createImages = async (req, res) => {
    try {        
        const user = req.user
        const files = req.files    
        
        if (!files) {
            const response = res.generic.unknown()

            return res
            .status(500)
            .send(response)
        }   

        req.user.createRecordJPGS(files)
        await user.save()

        const response = res.generic.add({ user })
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

// ---> Tasks <---
tasks = async (req, res) => {
    try {                
        const user = req.user               
        await user.populate('tasks').execPopulate()
        const tasks = user.tasks

        const response = res.generic.add({ tasks })
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()
        console.log(e);
        
        res
        .status(500)
        .send(response)
    }
}

// ---> Register User <---
sendCode = async (req, res) => {
    try {                     
        const phone = req.query.phone
        const code = utils.generateAuthCode()    
        const verify = await Verify.findOne({ phone })

        await sms.sendCode(phone, code)
        
        if (!verify) {
            const verify = new Verify({ phone, code })
            await verify.save()
        }

        await Verify.findOneAndUpdate({ phone }, { code })
         setTimeout (async function() {
            await Verify.findOneAndUpdate({ phone }, { code: undefined })
        },60000)

        const response = res.generic.success().withMessage(message.register.res)

        res
        .status(200)
        .send(response)
    } catch (e) {
        let msg = message.unknown.res
        if (e.errors) {
            msg = e.errors.phone.message
        }
        const response = res.generic.unSuccess(msg)
        
        res
        .status(500)
        .send(response)
    }
}

verifyCode = async (req, res) => {
    try {             
        const phone = req.query.phone
        const code = req.query.code
        const fcmToken = req.query.fcmToken
        
        const verify = await Verify.findOne({ phone })

        if (!verify) {
            const response = res.generic.unSuccess(message.badCode.res)

            return res
            .status(500)
            .send(response)
        }

        if (!verify.code) {
            const response = res.generic.unSuccess(message.expiredCode.res)

            return res
            .status(500)
            .send(response)
        }

        if (verify.code !== code) {
            const response = res.generic.unSuccess(message.badCode.res)

            return res
            .status(500)
            .send(response)
        }

        let user = await User.findOne({ phone })
        let msg = ''

        if (!user) {
            // add user
            const enterType = 'REGISTER'
            user = new User({ phone, fcmToken, enterType })
            msg = message.register.res
        } else {
            // entered user
            user.enterType = 'LOGIN'
            msg = message.entered.res
        }
        user.fcmToken = fcmToken
        const token = await user.generateAuthToken()
        const response = res.generic.add({
            user,
            token
        }).withMessage(msg)

        // remove code from verify
        await Verify.findOneAndUpdate({ phone, code }, { code : undefined })

        res
        .status(200)
        .send(response)
    } catch (e) {        
        const response = res.generic.unknown()
        res
        .status(500)
        .send(response)
    }
} 

// ---> Purchase User <---
addPurchase = async (req, res) => {
    try {                
        const _id = req.params.id
        const user = req.user

        if (!_id) {
            const response = res.generic.unknown()

            return res
            .status(500)
            .send(response)
        }   

        const purchase = await Purchase.findById(_id)
        user.purchase = purchase._id        
        await user.save()
        await user.populate('purchase').execPopulate()       

        const response = res.generic.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()
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