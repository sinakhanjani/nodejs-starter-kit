// Importing required modules and dependencies
const users = []

// Importing required modules and dependencies
const addUser = ({ id, userId, roomId, secendUserId }) => {

    // Validate the data
    if (!userId || !roomId || !secendUserId) {
        return {
            error: 'userId and room are required!'
        }
    }

    // Check for existing user
// Importing required modules and dependencies
    const existingUser = users.find((user) => {
        return user.roomId === roomId && user.userId === userId
    })

    // Validate userId
    if (existingUser) {
        return {
            error: 'userId is in use!'
        }
    }

    // Store user
// Importing required modules and dependencies
    const user = { id, userId, roomId, secendUserId }
    users.push(user)
    return { user }
}

// Importing required modules and dependencies
const removeUser = (id) => {
// Importing required modules and dependencies
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Importing required modules and dependencies
const getUser = (id) => {
// Function definition
    return users.find((user) => user.id === id)
}

// Importing required modules and dependencies
const getUsersInRoom = (roomId) => {
// Function definition
    return users.filter((user) => user.roomId === roomId)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
