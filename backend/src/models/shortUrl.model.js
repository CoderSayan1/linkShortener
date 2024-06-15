import mongoose from 'mongoose'
import { nanoid } from 'nanoid';

const shortUrlSchema = new mongoose.Schema({
    originalUrl:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true,
        default: () => nanoid().substring(0, 10)
    },
    clicks:{
        type: Number,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

export const URL = mongoose.model('URL', shortUrlSchema);