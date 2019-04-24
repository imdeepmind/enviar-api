import express from 'express';

import { register, login, checkUsername, checkEmail  } from '../../controller/auth';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/username/:username', checkUsername);

router.get('/email/:email', checkEmail);

export default router;