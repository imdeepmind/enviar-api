'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../../controller/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', _auth.login);

router.post('/register', _auth.register);

router.get('/username/:username', _auth.checkUsername);

router.get('/email/:email', _auth.checkEmail);

exports.default = router;
//# sourceMappingURL=auth.js.map