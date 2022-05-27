
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: {
        type: String
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["employee", "admin"]
    }
});

const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;
