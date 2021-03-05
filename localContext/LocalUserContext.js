const users = {}

module.exports = {
    addUser (userId, userModel) {
        if (users[userId] !== undefined) return
        users[userId] = userModel
    },

    getUser (userId) {
        return users[userId]
    },

    updateUser(userId, { type, payload }) {
        if (users[userId] === undefined) return
        users[userId][type] = payload
    },

    removeUser(userId) {
        if (users[userId] === undefined) return
        delete users[userId]
    }
}