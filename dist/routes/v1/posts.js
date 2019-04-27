'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _posts = require('../../controller/posts');

var _middlewares = require('../../middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _middlewares.checkAuth, _posts.getPosts);

router.get('/:id', _middlewares.checkAuth, _posts.getPotsById);

router.post('/', _middlewares.checkAuth, _middlewares.uploadPostImage.single('img'), _middlewares.resizePostImage, _posts.addPost);

router.put('/:id', _middlewares.checkAuth, _posts.editPost);

router.delete('/:id', _middlewares.checkAuth, _posts.deletePost);

exports.default = router;
//# sourceMappingURL=posts.js.map