import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    shortUrl:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'URL'
        }
    ],
    password:{
        type: String,
        required: [true, 'Password is required']
    }
}, {timestamps: true})



export const User = mongoose.model('User',  userSchema)