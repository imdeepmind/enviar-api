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
    content: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        min: 4,
        max: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Posts', schema);
