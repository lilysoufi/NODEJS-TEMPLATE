const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        //required: true,
        unique: true,
    },
    password: {
        type: String,
        //required: true,
    },
    socketId: {
        type: String,
        default: null
    },
    currentRoom: {
        type: String,
        default: 'general'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
        isOnline: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);