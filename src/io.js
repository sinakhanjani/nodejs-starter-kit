const { app } = require('./app')
const http = require('http')
const socketio = require('socket.io')
const { ObjectId } = require('mongodb')
const { generateMessage, generateLocationMessage } = require('./modules/chat/utils/utils.message')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./modules/chat/utils/utils.user')
const User = require('../src/modules/user/user.model')
const Room = require('../src/modules/chat/ptp/room/room.model')
const Message = require('../src/modules/chat/ptp/message/message.model')

// Create WebServer
const server = http.createServer(app)
const io = socketio(server)


io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join',async (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.roomId)

        socket.emit('message', generateMessage('ADMIN', 'WELCOME!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.userId} has joined!`))
        io.to(user.roomId).emit('roomData', {
            room: user.roomId,
            users: getUsersInRoom(user.roomId)
        })

        var query = {},
        update = {
            users: {
                sender: ObjectId(user.userId),
                receiver: ObjectId(user.secendUserId)
            }
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        // Find the document
        await Room.findOneAndUpdate(query, update, options, function(error, result) {
            if (error) return
            // do something with the document
            //
        })
        callback()
    })

    socket.on('sendMessage', async (message, callback) => {
        const user = getUser(socket.id)
        
        io.to(user.roomId).emit('message', generateMessage(user.userId, message))

        const msg = new Message({
            message,
            room: ObjectId(user.roomId),
            sender: ObjectId(user.userId),
            receiver: ObjectId(user.secendUserId)
        })

        await msg.save()
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.roomId).emit('locationMessage', generateLocationMessage(user.userId, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.roomId).emit('message', generateMessage('Admin', `${user.userId} has left!`))
            io.to(user.roomId).emit('roomData', {
                room: user.roomId,
                users: getUsersInRoom(user.roomId)
            })
        }
    })
})

// io.on('connection', (socket) => {    
//     // * send to ''every users'' connected
//     io.emit('master','send to every users connected')

//     // * post data to current user when connected
//     socket.emit('master','current user join to server.') 

//     // * send broadcast to all users ''exepct current user'' when another user connected
//     socket.broadcast.emit('master','new user join to server.')

//     // * current user is now disconnected
//     socket.on('disconnect', () => {
//         io.emit('sendMessage', 'a user has left')
//     })
// })

module.exports = server

