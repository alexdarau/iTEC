import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser'
import { Model } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String
    },
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

export default User;
