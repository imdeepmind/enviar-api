import express from 'express';

import { checkAuth } from '../../middlewares';
import { follow, unfollow, block } from '../../controller/interactions';

const router = express.Router();

router.put('/follow/:username', checkAuth, follow);

router.put('/unfollow/:username', checkAuth, unfollow);

router.put('/block/:username', checkAuth, block);

export default router;