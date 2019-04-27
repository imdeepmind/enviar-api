'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 4,
        max: 24,
        trim: true
    },
    to: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 4,
        max: 24,
        trim: true
    },
    message: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

exports.default = _mongoose2.default.model('Chats', schema);
//# sourceMappingURL=chats.js.map