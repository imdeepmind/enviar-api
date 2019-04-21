import express from 'express';

import { checkAuth } from '../../middlewares';
import { updatePassword } from '../../controller/settings';

const router = express.Router();

router.put('/change/password', checkAuth, updatePassword);

export default router;