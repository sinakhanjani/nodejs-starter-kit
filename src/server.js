// Importing required modules and dependencies
const server = require('./io')
// Importing required modules and dependencies
const { host, port } = require('./app')

// Listening server
// Function definition
server.listen(port, () => {
    if (server.address().host) {
        process.env.HOST = server.address().host
    }

// Importing required modules and dependencies
    const $host = server.address().host || host
// Importing required modules and dependencies
    const message = `Socket: ${$host} is opening on port: ${port}`
    console.log(message);
})
