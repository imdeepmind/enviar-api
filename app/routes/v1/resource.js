import express from 'express';

import { getImage  } from '../../controller/resource';

const router = express.Router();

router.get('/:type/:file/:resolution', getImage);

export default router;
