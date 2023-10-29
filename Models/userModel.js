import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, lowercase: true ,},
    role: { type: String, default: 'user' },
    password: String,
   
});


export const User = mongoose.model('User', UserSchema);