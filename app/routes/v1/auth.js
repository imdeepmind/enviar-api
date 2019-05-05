import express from 'express';

import { register, login, checkUsername, checkEmail, checkToken  } from '../../controller/auth';
import { checkAuth } from '../../middlewares';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/username/:username', checkUsername);

router.get('/email/:email', checkEmail);

router.get('/checkToken', checkAuth, checkToken);

export default router;
