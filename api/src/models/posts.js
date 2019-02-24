import mongoose from 'mongoose';

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        username: {
            type: String,
            required: true,
            index: true,
            min: 4,
            max: 24,
            trim: true,
        }
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 4,
        max: 24,
    },
    likes: {
        totalLike: {
            type: Number,
            required: true,
            default: 0,
        }, 
    },
    comments: {
        totalComments: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})