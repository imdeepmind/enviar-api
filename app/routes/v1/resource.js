import express from 'express';

import { checkAuth } from '../../middlewares';
import { getImage  } from '../../controller/resource';

const router = express.Router();

router.get('/:type/:file/:resolution', checkAuth, getImage);

export default router;