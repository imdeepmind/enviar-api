import express from 'express';

import { getPosts, getPotsById, addPost, editPost, deletePost } from '../../controller/posts';
import { checkAuth, uploadPostImage, resizePostImage } from '../../middlewares';

const router = express.Router();

router.get('/', checkAuth, getPosts);

router.get('/:id', checkAuth, getPotsById);

router.post('/', checkAuth, uploadPostImage.single('img'), resizePostImage, addPost);

router.put('/:id', checkAuth, editPost);

router.delete('/:id', checkAuth, deletePost);

export default router;