
const socket = io()

// socket.on('message', (message) => {
//     console.log(message)
//     const html = Mustache.render(messageTemplate, {
//         username: message.username,
//         message: message.text,
//         createdAt: moment(message.createdAt).format('h:mm a')
//     })
//     $messages.insertAdjacentHTML('beforeend', html)
//     autoscroll()
// })

// socket.on('locationMessage', (message) => {
//     console.log(message)
//     const html = Mustache.render(locationMessageTemplate, {
//         username: message.username,
//         url: message.url,
//         createdAt: moment(message.createdAt).format('h:mm a')
//     })
//     $messages.insertAdjacentHTML('beforeend', html)
//     autoscroll()
// })

// socket.on('roomData', ({ room, users }) => {
//     const html = Mustache.render(sidebarTemplate, {
//         room,
//         users
//     })
//     document.querySelector('#sidebar').innerHTML = html
// })

// $messageForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     $messageFormButton.setAttribute('disabled', 'disabled')

//     const message = e.target.elements.message.value

//     socket.emit('sendMessage', message, (error) => {
//         $messageFormButton.removeAttribute('disabled')
//         $messageFormInput.value = ''
//         $messageFormInput.focus()

//         if (error) {
//             return console.log(error)
//         }

//         console.log('Message delivered!')
//     })
// })

// $sendLocationButton.addEventListener('click', () => {
//     if (!navigator.geolocation) {
//         return alert('Geolocation is not supported by your browser.')
//     }

//     $sendLocationButton.setAttribute('disabled', 'disabled')

//     navigator.geolocation.getCurrentPosition((position) => {
//         socket.emit('sendLocation', {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//         }, () => {
//             $sendLocationButton.removeAttribute('disabled')
//             console.log('Location shared!')  
//         })
//     })
// })

// const secendUserId = '5ee6577007fab00a87e5f85c'
// const userId = '5ee357dcc9b880366659fc6f'
// const roomId = '5ef90ea05d06153081b52332'

// socket.emit('join', { userId, roomId, secendUserId }, (error) => {
//     if (error) {
//         alert(error)
//         location.href = '/'
//     }
// })



