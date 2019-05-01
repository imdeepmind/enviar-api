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
        min: 4,
        max: 24,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        min: 4,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

exports.default = _mongoose2.default.model('Posts', schema);
//# sourceMappingURL=posts.js.map