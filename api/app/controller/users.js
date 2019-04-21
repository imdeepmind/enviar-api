import xss from 'xss';

import userModel from '../models/users';
import logger from '../utils/logger';

export const getOne = (req, res) => {
    const findQuery = {
        username: {$eq: xss(req.params.username)}
    }

    const selectedField = {
        username: 1, name: 1, email: 1, city: 1, state: 1, country: 1,
        gender: 1, dob: 1, avatar: 1, status: 1, bio: 1, 
        createdAt: 1, updatedAt: 1, isActive: 1,  followee: 1, followers: 1
    }

    userModel.findOne(findQuery, selectedField, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.debug(`Returned with user ${doc.username}`);
            return res.status(200).json(doc);
        } else {
            logger.debug(`User with ${data.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const getAll = (req, res) => {
    let page = xss(req.query.page);
    let limit = xss(req.query.limit);
    
    if (!page || page < 0) page = 0;
    if (!limit || limit <= 0) limit = 1;
    
    const findQuery = {
        username: {$ne: xss(req.authData.username)}
    }

    const selectedField = {
        username: 1, name: 1, email: 1, city: 1, state: 1, country: 1,
        gender: 1, dob: 1, avatar: 1, status: 1, bio: 1, 
        createdAt: 1, updatedAt: 1, isActive: 1,  followee: 1, followers: 1
    }

    userModel.find(findQuery, selectedField, {limit: limit, skip: page * limit}, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.debug(`Returned with user ${doc.username}`);
            return res.status(200).json(doc);
        } else {
            logger.debug(`User with ${data.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}