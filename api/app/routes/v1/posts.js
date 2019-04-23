import express from 'express';

import { getPosts, getPotsById, addPost, editPost, deletePost } from '../../controller/posts';
import { checkAuth } from '../../middlewares';

const router = express.Router();

router.get('/', checkAuth, getPosts);

router.get('/:id', checkAuth, getPotsById);

router.post('/', checkAuth, addPost);

router.put('/:id', checkAuth, editPost);

router.delete('/:id', checkAuth, deletePost);

export default router;