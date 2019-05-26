import express from 'express';

import { checkAuth } from '../../middlewares';
import { getOne, getAll, allFollowers, allFollowee  } from '../../controller/users';

const router = express.Router();

router.get('/:username', checkAuth, getOne);

router.get('/:username/followers', checkAuth, allFollowers);

router.get('/:username/followee', checkAuth, allFollowee);

router.get('/', checkAuth, getAll);

export default router;