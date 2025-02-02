// Importing required modules and dependencies
const { app } = require('./app')
// Importing required modules and dependencies
const http = require('http')
// Importing required modules and dependencies
const socketio = require('socket.io')
// Importing required modules and dependencies
const { ObjectId } = require('mongodb')
// Importing required modules and dependencies
const { generateMessage, generateLocationMessage } = require('./modules/chat/utils/utils.message')
// Importing required modules and dependencies
const { addUser, removeUser, getUser, getUsersInRoom } = require('./modules/chat/utils/utils.user')
// Importing required modules and dependencies
const User = require('../src/modules/user/user.model')
// Importing required modules and dependencies
const Room = require('../src/modules/chat/ptp/room/room.model')
// Importing required modules and dependencies
const Message = require('../src/modules/chat/ptp/message/message.model')

// Create WebServer
// Importing required modules and dependencies
const server = http.createServer(app)
// Importing required modules and dependencies
const io = socketio(server)


// Function definition
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

// Function definition
    socket.on('join',async (options, callback) => {
// Importing required modules and dependencies
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

        let query = {},
        update = {
            users: {
                sender: ObjectId(user.userId),
                receiver: ObjectId(user.secendUserId)
            }
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        // Find the document
const await Room.findOneAndUpdate = (query, update, options, 
            if (error) return
            // do something with the document
            //
        })
        callback()
    })

// Function definition
    socket.on('sendMessage', async (message, callback) => {
// Importing required modules and dependencies
        const user = getUser(socket.id)

        io.to(user.roomId).emit('message', generateMessage(user.userId, message))

// Importing required modules and dependencies
        const msg = new Message({
            message,
            room: ObjectId(user.roomId),
            sender: ObjectId(user.userId),
            receiver: ObjectId(user.secendUserId)
        })

        await msg.save()
        callback()
    })

// Function definition
    socket.on('sendLocation', (coords, callback) => {
// Importing required modules and dependencies
        const user = getUser(socket.id)
        io.to(user.roomId).emit('locationMessage', generateLocationMessage(user.userId, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

// Function definition
    socket.on('disconnect', () => {
// Importing required modules and dependencies
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

// Function definition
// io.on('connection', (socket) => {
//     // * send to ''every users'' connected
//     io.emit('master','send to every users connected')

//     // * post data to current user when connected
//     socket.emit('master','current user join to server.')

//     // * send broadcast to all users ''exepct current user'' when another user connected
//     socket.broadcast.emit('master','new user join to server.')

//     // * current user is now disconnected
// Function definition
//     socket.on('disconnect', () => {
//         io.emit('sendMessage', 'a user has left')
//     })
// })

module.exports = server

