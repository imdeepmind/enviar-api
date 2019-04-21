import xss from 'xss';

import messages from '../messages';
import userModel from '../models/users';
import logger from '../utils/logger';
import { comparePassword, generatePasswordHash } from '../utils/hash';

export const updatePassword = (req, res) => {
    req.check('old', 'Invalid old password').isString().isLength({min:4, max:24}).isAlphanumeric();
    req.check('new', 'Invalid new password').isString().isLength({min:4, max:24}).isAlphanumeric();
    
    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const findQuery = {
        username: {$eq: xss(req.authData.username)}
    }

    generatePasswordHash(req.body.old)
    .then(hash => {
        comparePassword(hash, req.body.new)
        .then(_ => {
            generatePasswordHash(req.body.new)
            .then(hash => {
                const update = {
                    password: hash
                }
                userModel.findOneAndUpdate(findQuery, update, (err, doc) => {
                    if (err) {
                        logger.error('Database error: ', err);
                        return res.boom.badImplementation(messages['m500.0']);
                    } else if (doc) {
                        logger.debug(`Updated user with ${doc.username} username`);
                        return res.status(200).json({
                            name: doc.name,
                            username: doc.username,
                            email: doc.email,
                            country: doc.country,
                            dob: doc.dob,
                            gender: doc.gender,
                            email: doc.email,
                            city: doc.city,
                            state: doc.state,
                            country: doc.country,
                            status: doc.status,
                            bio: doc.bio,
                            avatar: doc.avatar
                        });
                    } else {
                        logger.debug(`User with ${data.username} does not exist`);
                        return res.boom.notFound(messages['m404.0']);
                    }
                })
            })
            .catch(_ => {
                logger.error('JWT Error: ', err);
                return res.badImplementation(messages['m500.0']);
            })
        })
        .catch(err => {
            if (err === 'm401.0'){
                logger.debug('Wrong password');
                return res.boom.unauthorized(messages['m401.0']);
            } else if (err == 'm500.0'){
                logger.error('JWT Error: ', err);
                return res.badImplementation(messages['m500.0']);
            }
        })
    })
    .catch(_ => {
        logger.error('JWT Error: ', err);
        return res.badImplementation(messages['m500.0']);
    })
}