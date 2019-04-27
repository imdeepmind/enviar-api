'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 4,
        max: 24,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max: 255,
        unique: true,
        trim: true
    },
    city: {
        type: String,
        min: 4,
        max: 255
    },
    state: {
        type: String,
        min: 4,
        max: 255
    },
    country: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    gender: {
        type: String,
        required: true,
        enum: ['m', 'f', 'o']
    },
    dob: {
        type: Date,
        required: true
    },
    avatar: {
        type: String
    },
    status: {
        type: String,
        min: 4,
        max: 255
    },
    bio: {
        type: String,
        min: 24,
        max: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    lastLoginAt: {
        type: Date,
        default: Date.now
    },
    tokenHash: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    followee: [],
    followers: [],
    blocked: []
});

exports.default = _mongoose2.default.model('Users', schema);
//# sourceMappingURL=users.js.map