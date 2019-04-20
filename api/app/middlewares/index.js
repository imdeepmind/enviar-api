import jwt from 'jsonwebtoken';
import xss from 'xss';
import mongoose from 'mongoose';

import config from '../config';
import messages from '../messages';
import userModel from '../models/users';
import logger from '../utils/logger';

export const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token){
        jwt.verify(token, config.JWT_KEY, (err, authData) => {
            if (err){
                logger.error('JWT Error: ', err);
                return res.badImplementation(messages['m500.0']);
            }

            const findQuery = {
                '_id' : {$eq: mongoose.Types.ObjectId(authData.obj_id)},
                'username' : {$eq: username},
                'tokenHash' : {$eq: authData.hash}
            }

            const selected = {_id: 1}

            userModel.findOne(findQuery, selected, (err, doc) => {
                if (err) {
                    logger.error('Database Error: ', err);
                    return res.badImplementation(messages['m500.0']);
                } else if (doc) {
                    req.authData = authData;
                    next();
                } else {
                    logger.debug(`User with ${username} does not exist`);
                    return res.boom.notFound(messages['m404.0']);
                }
            }) 
        });
    } else {
        return res.boom.unauthorized(messages['m401.1']);
    }
    next();
}