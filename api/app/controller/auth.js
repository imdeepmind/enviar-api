import xss from 'xss';

import { generatePasswordHash, generateHash, comparePassword  } from '../utils/hash';
import { insert } from '../services/user-service';
import logger from '../utils/logger';
import messages from '../messages';

export const register = (req, res) => {
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();
    req.check('password', 'Invalid password').isString().isLength({min:4, max:24}).isAlphanumeric().equals(req.body.conformPassword);
    req.check('email', 'Invalid email').isString().isLength({min:4, max:255}).isEmail();
    req.check('name', 'Invalid name').isString().isLength({min:4, max:255});
    req.check('gender', 'Invalid gender').isString().isIn(['m', 'f', 'o']);
    req.check('dob', 'Invalid date of birth').isString().isBefore();
    req.check('country', 'Invalid country').isString().isLength({min:4, max:255}).isAlphanumeric();

    const errors = req.validationErrors();
    if (errors) {
        logger.info('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }
        
    const data = {
        username: xss(req.body.username),
        password: req.body.password,
        email: xss(req.body.email),
        name: xss(req.body.name),
        gender: xss(req.body.gender),
        country: xss(req.body.country),
        dob: xss(req.body.dob)
    }

    insert(data)
    .then(resp => {
        logger.info(`User with ${data.username} username account created`);
        return res.status(201).json({
            'message' : messages['m201.0'],
            'data': resp
        })
    })
    .catch(err => {
        if (err === 'm400.0' || err === 'm400.1'){
            res.boom.badRequest(messages[err]);
        } else if (err === 'm500.0'){
            res.boom.badImplementation(messages[err]);
        }
    })

}

export const login = (req, res) => {
    logger.info('at login controller');
}

export const username = (req, res) => {
    logger.info('at username controller');
}

// insert({
//     "username" : "imdeepmind",
//     "password" : "12345",
//     "name" : "Abhishek Chatterjee",
//     "email" : "infinityatme@gmail.com",
//     "city" : "Guwahati",
//     "state" : "Assam",
//     "country" : "India",
//     "gender" : "m",
//     "dob" : "1997-01-17",
//     "avatar" : "",
//     "status" : "Sample status",
//     "bio" : "Sample bio"
// })