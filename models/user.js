import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser'
import { Model } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema, 'User');

export default User;
