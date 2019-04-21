import express from 'express';

import { checkAuth } from '../../middlewares';
import { follow2, unfollow, block } from '../../controller/interactions';

const router = express.Router();

router.put('/follow/:username', checkAuth, follow2);

router.put('/unfollow/:username', checkAuth, unfollow);

router.put('/block/:username', checkAuth, block);

export default router;