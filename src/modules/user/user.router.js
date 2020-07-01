const express = require('express')
const error = require('../../middleware/error')
const auth = require('../../middleware/auth')
const admin = require('../../middleware/basicAuth')
const multer = require('../../../helper/multer.helper')
const { get , add , remove , update , removeMe , me, removeDocuments, addImages, sendCode, verifyCode, removeImages, createImages, tasks , addPurchase } = require('../user/user.controller')

const router = new express.Router()

// Admin
router.get('/user', admin, get)
router.post('/user/add', admin, multer.single('image'), add)
router.post('/user/remove/users', admin, removeDocuments)
router.post('/user/remove/:id', admin, remove)

// Auth
router.get('/user/me', auth, me)
router.get('/user/tasks', auth, tasks)
router.post('/user/purchase/add/:id', auth, addPurchase)
router.post('/user/remove/me', auth, removeMe)
router.post('/user/update', auth, multer.single('image'), update)

// Auth - with files
router.post('/user/files/add', auth, multer.array('images',4), addImages)
router.post('/user/files/create/', auth, multer.array('images',4), createImages)
router.post('/user/files/remove/:id', auth, removeImages)

// Register
router.get('/user/sendcode', error, sendCode)
router.get('/user/verifycode', error, verifyCode)

module.exports = router