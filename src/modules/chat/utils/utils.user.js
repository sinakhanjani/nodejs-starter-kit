const users = []

const addUser = ({ id, userId, roomId, secendUserId }) => {

    // Validate the data
    if (!userId || !roomId || !secendUserId) {
        return {
            error: 'userId and room are required!'
        }
    }

    // Check for existing user
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
    const user = { id, userId, roomId, secendUserId }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (roomId) => {
    return users.filter((user) => user.roomId === roomId)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}