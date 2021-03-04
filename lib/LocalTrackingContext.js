const trackers = {}

module.exports = {
    addTracker (userId, trackingModel) {
        if (trackers[userId] !== undefined) return
        trackers[userId] = trackingModel
    },

    getTracker (userId) {
        return trackers[userId]
    },

    updateTracker(userId, { type, payload }) {
        if (trackers[userId] === undefined) return
        trackers[userId][type] = payload
    },

    removeUser(userId) {
        if (trackers[userId] === undefined) return
        delete trackers[userId]
    }
}