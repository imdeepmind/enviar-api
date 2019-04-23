import express from 'express';

import { getPosts, getPotsById, addPost, editPost, deletePost } from '../../controller/posts';

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPotsById);

router.post('/', addPost);

router.put('/:id', editPost);

router.delete('/:id', deletePost);

export default router;