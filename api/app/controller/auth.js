import xss from 'xss';
import mongoose from 'mongoose';

import usersModel from '../models/users';
import { comparePassword, generateHash, generateToken, generatePasswordHash } from '../utils/hash';
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

    const findQuery = {
        $or: [
            {'username' : {$eq: data.username}},
            {'email' : {$eq: data.email}}
        ]
    }
    const what =  {
        _id: 1
    }


    usersModel.findOne(findQuery, what, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.info(`Username ${data.username} exists in the db`);
            return res.boom.badRequest(messages['m400.0']);
        } else {
            generatePasswordHash(data.password)
            .then(hash => {
                data.password = hash;
                data._id = new mongoose.Types.ObjectId();
                const u = usersModel(data);

                u.save((err, doc) => {
                    if (err) {
                        logger.error('Database error: ', err);
                        return res.boom.badImplementation(messages['m500.0']);
                    } else if (doc) {
                        logger.info(`User created with username ${doc.username}`);
                        return res.status(201).json({
                            name: doc.name,
                            username: doc.username,
                            email: doc.email,
                            country: doc.country,
                            dob: doc.dob,
                            gender: doc.gender,
                        })
                    }
                })
            })
            .catch(err => {
                logger.error('Bcrypt error', err);
                return res.boom.badImplementation(messages['m500.0']);
            })
            

            
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

    const findQuery = {
        'username' : {$eq: data.username}
    }

    const what = {
        _id: 1, username: 1, password: 1, tokenHash: 1, name: 1, avatar: 1
    }

    usersModel.findOne(findQuery, what, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            comparePassword(doc.password, data.password)
            .then(h => {
                let hash = '';
                if (doc.tokenHash)
                    hash = doc.tokenHash;
                else 
                    hash = generateHash();

                const update = {
                    tokenHash: hash
                }

                usersModel.findOneAndUpdate(findQuery, update, (err, _) => {
                    if (err) {
                        logger.error('Database error: ', err);
                        return res.boom.badImplementation(messages['m500.0']);
                    } else if (_) {
                        logger.info('Login successful');
                        const token = generateToken(doc.name, doc.username, hash, doc.avatar, doc._id);
                        return res.status(202).json({
                            token: token
                        })
                    }
                })    
            }) 
            .catch(_ => {
                logger.info('Wrong password');
                return res.boom.unauthorized(messages['m401.0']);
            })
        } else {
            logger.info(`User with ${data.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
    
}

export const checkUsername = (req, res) => {
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();

    const errors = req.validationErrors();
    if (errors) {
        logger.info('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const data = {
        username: xss(req.params.username)
    }

    const findQuery = {
        'username' : {$eq: data.username}
    }

    const what = {
        _id: 1,
    }

    usersModel.findOne(findQuery, what, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.info(`User with username ${data.username} exist`);
            return res.status(200).json({
                'message' : messages['m201.1'],
                'data': true
            })
        } else {
            logger.info(`User with username ${data.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const checkEmail = (req, res) => {
    req.check('email', 'Invalid email').isString().isLength({min:4, max:255}).isEmail();

    const errors = req.validationErrors();
    if (errors) {
        logger.info('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const data = {
        email: xss(req.params.email)
    }

    const findQuery = {
        'email' : {$eq: data.email}
    }

    const what = {
        _id: 1,
    }

    usersModel.findOne(findQuery, what, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.info(`User with email ${data.email} exist`);
            return res.status(200).json({
                'message' : messages['m201.1'],
                'data': true
            })
        } else {
            logger.info(`User with email ${data.email} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}