import { Document } from 'mongoose';

export interface IUserModel extends Document {
    name: string,
    email: string,
    password: string,
}

export interface ILogin extends Document {
    email: string,
    password: string
}

export interface IRegister extends Document {
    name: string,
    email: string,
    password: string
}
