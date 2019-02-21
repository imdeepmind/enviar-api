import express from 'express';
import bodyParser from 'body-parser';
import { check } from 'express-validator/check';
import multer from 'multer';
import path from 'path';
import { Login, Register, CheckUsername } from '../controller';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/auth/login/', Login);

router.post('/auth/register', Register);

router.get('/auth/check-username/', CheckUsername);