import express from 'express';

import { checkAuth } from '../../middlewares';
import { follow, unfollow, block, unblock } from '../../controller/interactions';

const router = express.Router();

router.put('/follow/:username', checkAuth, follow);

router.put('/unfollow/:username', checkAuth, unfollow);

router.put('/block/:username', checkAuth, block);

router.put('/unblock/:username', checkAuth, unblock);

export default router;