import express from 'express';

import { register, login, username  } from '../../controller/auth';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/username/:username', username);

export default router;