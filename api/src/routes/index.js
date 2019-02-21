import express from 'express';
import bodyParser from 'body-parser';
import { check } from 'express-validator/check';
import multer from 'multer';
import path from 'path';
import { Login, Register, CheckUsername } from '../controller';

const router = express.Router();

const upload = multer({
    dest: 'images/',
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/auth/login/', [
    check('username')
    .isLength({min:4, max:24})
    .isAlphanumeric(),
    check('password')
    .isString()
    .isLength({min:4, max:24}),
], Login);

router.post('/auth/register', [
    check('name')
    .isLength({min:4,max:255})
    .isAlphanumeric(),
    check('email')
    .isEmail(),
    check('username')
    .isLength({min:4, max:24})
    .isAlphanumeric(),
    check('password')
    .isString()
    .isLength({min:4, max:24}),
    check('country')
    .isLength({min:4,max:255})
    .isAlphanumeric(),
    check('gender')
    .isLength({min:4,max:255})
    .isIn(['male', 'female', 'other']),
    check('dob')
    .custom(date => {
        return date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    })
], Register);

router.get('/auth/check-username/', [
    check('username')
    .isLength({min:4, max:24})
    .isAlphanumeric(),
], CheckUsername);

export default router;