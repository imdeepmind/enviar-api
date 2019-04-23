import express from 'express';

import { checkAuth } from '../../middlewares';
import { getChats, getChat, postChat, deleteChat } from '../../controller/chats';

const router = express.Router();

router.get('/', checkAuth, getChats);

router.get('/:id', checkAuth, getChat);

router.post('/:username', checkAuth, postChat)

router.delete('/:id', checkAuth, deleteChat);

export default router;