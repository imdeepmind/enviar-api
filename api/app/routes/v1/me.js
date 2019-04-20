import express from 'express';

import { checkAuth } from '../../middlewares';
import { getMe, updateMe, deleteMe, UpdateDp } from '../../controller/me';

const router = express.Router();

router.get('/', checkAuth, getMe);

router.put('/', checkAuth, updateMe);

router.delete('/', checkAuth, deleteMe);

router.put('/dp', checkAuth, UpdateDp);

export default router;