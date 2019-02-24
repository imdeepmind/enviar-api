import mongoose from 'mongoose';

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tokenHash: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 4,
        max: 24,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 4, 
        max: 255,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        min: 9, 
        max: 15,
        trim: true,
    },
    city:{
        type: String,
        min: 4,
        max: 255,
    },
    state: {
        type: String,
        min: 4,
        max: 255,
    },
    country: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },
    gender: {
        type: String,
        required: true,
        enum: ['m', 'f', 'o']
    },
    dob: {
        type: Date,
        required: true,
    },
    avatar: {
        type: String,
    },
    status: {
        type: String,
        min: 4,
        max: 255,
    },
    bio: {
        type: String,
        min: 24,
        max: 1024,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Users', schema);