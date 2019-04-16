import xss from 'xss';

import { insert, findByEmail, findByUsername } from '../services/user-service';
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
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();
    req.check('password', 'Invalid password').isString().isLength({min:4, max:24}).isAlphanumeric();

    const errors = req.validationErrors();
    if (errors) {
        logger.info('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const data = {
        username: xss(req.body.username),
        password: req.body.password,
    }

}

export const checkUsername = (req, res) => {
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();

    const errors = req.validationErrors();
    if (errors) {
        logger.info('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const data = {
        username: xss(req.body.username)
    }

    findByUsername(data)
    .then(_ => {
        logger.info(`User with ${data.username} found`);
        return res.status(201).json({
            'message' : messages['m201.1'],
            'data': true
        })
    })
    .catch(err => {
        if (err === 'm404.0'){
            res.boom.notFound(messages[err]);
        } else if (err === 'm500.0'){
            res.boom.badImplementation(messages[err]);
        }
    })
}