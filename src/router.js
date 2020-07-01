const userRoute = require('./modules/user/user.router')
const adminRoute = require('./modules/admin/admin.router')
const paymentRoute = require('./modules/payment/payment.router')
const taskRoute = require('./modules/task/task.router')
const todoRoute = require('./modules/todo/todo.router')
const purchaseRoute = require('./modules/purchase/purchase.router')
const roomsRoute = require('./modules/chat/ptp/room/room.router')
const messagesRoute = require('./modules/chat/ptp/message/message.router')
const error = require('./middleware/error')

module.exports = (app) => {
    app.use('/api', userRoute)
    app.use('/api', adminRoute)
    app.use('/api', paymentRoute)
    app.use('/api', taskRoute)
    app.use('/api', todoRoute)
    app.use('/api', purchaseRoute)
    app.use('/api', roomsRoute)
    app.use('/api', messagesRoute)

    app.use('*', error, (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Sina Khanjani',
            errorMessage: 'Page not found.'
        })
    })

    return app;
}