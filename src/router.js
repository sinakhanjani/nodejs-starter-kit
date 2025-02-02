// Importing required modules and dependencies
const userRoute = require('./modules/user/user.router')
// Importing required modules and dependencies
const adminRoute = require('./modules/admin/admin.router')
// Importing required modules and dependencies
const paymentRoute = require('./modules/payment/payment.router')
// Importing required modules and dependencies
const taskRoute = require('./modules/task/task.router')
// Importing required modules and dependencies
const todoRoute = require('./modules/todo/todo.router')
// Importing required modules and dependencies
const purchaseRoute = require('./modules/purchase/purchase.router')
// Importing required modules and dependencies
const roomsRoute = require('./modules/chat/ptp/room/room.router')
// Importing required modules and dependencies
const messagesRoute = require('./modules/chat/ptp/message/message.router')
// Importing required modules and dependencies
const error = require('./middleware/error')

// Function definition
module.exports = (app) => {
    app.use('/api', userRoute)
    app.use('/api', adminRoute)
    app.use('/api', paymentRoute)
    app.use('/api', taskRoute)
    app.use('/api', todoRoute)
    app.use('/api', purchaseRoute)
    app.use('/api', roomsRoute)
    app.use('/api', messagesRoute)

// Function definition
    app.use('/api', error, (req, res) => {
        res.render('index', {
            title: 'App Programing Interface.',
            name: 'Sina Khanjani',
            message: 'Use Postman for this API.'
        })
    })

// Function definition
    app.use('/payment', error, (req, res) => {
        res.render('payment', {
            title: 'پرداخت امن درگاه بانکی',
            name: 'توسعه دهنده سینا خانجانی',
            message: (res.message) ? res.message: 'پرداخت شما ناموفق بود'

        })
    })

// Function definition
    app.use('*', error, (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Sina Khanjani',
            errorMessage: 'Page not found.'
        })
    })

    return app
}
