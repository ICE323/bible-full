import mongoose, { Schema } from 'mongoose';

import { IUserModel } from '../utils/types';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model<IUserModel>('users', UserSchema);
export default UserModel;