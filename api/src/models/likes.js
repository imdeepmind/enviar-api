import mongoose from 'mongoose';

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true,
        index: true,
        min: 4,
        max: 24,
        trim: true,
    },
    post: {
        type: String,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Likes', schema);