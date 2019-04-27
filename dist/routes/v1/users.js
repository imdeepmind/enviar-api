'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../../middlewares');

var _users = require('../../controller/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:username', _middlewares.checkAuth, _users.getOne);

router.get('/', _middlewares.checkAuth, _users.getAll);

exports.default = router;
//# sourceMappingURL=users.js.map