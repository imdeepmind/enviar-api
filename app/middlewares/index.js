import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

import config from '../config';
import messages from '../messages';
import userModel from '../models/users';
import logger from '../utils/logger';

export const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token){
        jwt.verify(token, config.JWT_TOKEN, (err, authData) => {
            if (err){
                logger.error('JWT Error: ', err);
                return res.boom.unauthorized(messages['m401.1']);
            }
            const findQuery = {
                '_id' : {$eq: mongoose.Types.ObjectId(authData.obj_id)},
                'username' : {$eq: authData.username},
                'tokenHash' : {$eq: authData.hash}
            }

            const selected = {_id: 1}

            userModel.findOne(findQuery, selected, (err, doc) => {
                if (err) {
                    logger.error('Database Error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else if (doc) {
                    req.authData = authData;
                    next();
                } else {
                    logger.debug(`Unauthorized: User with ${authData.username} does not exist`);
                    return res.boom.unauthorized(messages['m401.1']);
                }
            })
        });
    } else {
        logger.debug(`Does not have any token`);
        return res.boom.unauthorized(messages['m401.1']);
    }
}

export const upload = multer({
    dest: 'images/raw/',
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            logger.debug('Invalid image');
            return callback(new Error('Only images are allowed'))
        }
        logger.debug('Uploading image');
        callback(null, true)
    }
});

export const uploadPostImage = multer({
    dest: 'posts/raw/',
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            logger.debug('Invalid image');
            return callback(new Error('Only images are allowed'))
        }
        logger.debug('Uploading image');
        callback(null, true)
    }
});

export const resizeImage = (req,res,next) => {
    const path = req.file.path;
    const name = path.split('/')[2];

    sharp(path)
    .resize(200, 200, {})
    .toFile('images/r200x200/' + name)
    .then((_) => {
        logger.debug('Resizing image to 200x200');
        sharp(path)
        .resize(48, 48, {})
        .toFile('images/r48x48/' + name)
        .then((_) => {
            logger.debug('Resizing image to 48x48');
            next();
        })
    })
    .catch(err => {
        logger.error('Error in resizing the image: ', err);
    });
}

export const resizePostImage = (req,res,next) => {
    const path = req.file.path;
    const name = path.split('/')[2];

    sharp(path)
    .resize(500, 500, {})
    .toFile('posts/r500x500/' + name)
    .then((_) => {
        logger.debug('Resizing image to 500x500');
        next();
    })
    .catch(err => {
        logger.error('Error in resizing the image: ', err);
    });
}
