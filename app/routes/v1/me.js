import express from 'express';

import { checkAuth, upload, resizeImage } from '../../middlewares';
import { getMe, updateMe, deleteMe, updateDp } from '../../controller/me';

const router = express.Router();

router.get('/', checkAuth, getMe);

router.put('/', checkAuth, updateMe);

router.delete('/', checkAuth, deleteMe);

router.put('/dp', checkAuth, upload.single('avatar'), resizeImage, updateDp);

export default router;