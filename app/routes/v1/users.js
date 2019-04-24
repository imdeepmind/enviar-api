import express from 'express';

import { checkAuth } from '../../middlewares';
import { getOne, getAll  } from '../../controller/users';

const router = express.Router();

router.get('/:username', checkAuth, getOne);

router.get('/', checkAuth, getAll);

export default router;