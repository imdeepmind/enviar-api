import mongoose from 'mongoose';

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 4,
        max: 24,
        trim: true,
    },
    to: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 4,
        max: 24,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Chats', schema);