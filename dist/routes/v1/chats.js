'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../../middlewares');

var _chats = require('../../controller/chats');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _middlewares.checkAuth, _chats.getChats);

router.get('/:id', _middlewares.checkAuth, _chats.getChat);

router.post('/:username', _middlewares.checkAuth, _chats.postChat);

router.delete('/:id', _middlewares.checkAuth, _chats.deleteChat);

exports.default = router;
//# sourceMappingURL=chats.js.map