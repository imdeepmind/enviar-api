import express from 'express';

import { checkAuth } from '../../middlewares';
import { getChats, getChat, postChat, deleteChat, getChatsByUsername, allPeoples } from '../../controller/chats';

const router = express.Router();

router.get('/', checkAuth, getChats);

router.get('/allpeoples', checkAuth, allPeoples);

router.get('/one/:id', checkAuth, getChat);

router.get('/:username', checkAuth, getChatsByUsername);

router.post('/:username', checkAuth, postChat)

router.delete('/:id', checkAuth, deleteChat);

export default router;
