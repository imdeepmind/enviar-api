import express from 'express';

import { checkAuth } from '../../middlewares';
import { getMe, updateMe, deleteMe, UpdateDp } from '../../controller/me';

const router = express.Router();

router.get('/', checkAuth, getMe);

router.put('/:id', checkAuth, updateMe);

router.delete('/:id', checkAuth, deleteMe);

router.put('/:id/dp', checkAuth, UpdateDp);

export default router;