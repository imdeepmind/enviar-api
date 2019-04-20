import mongoose from 'mongoose';

import userModel from '../models/users';
import messages from '../messages';
import logger from '../utils/logger';

export const getMe = (req, res) => {
    const findQuery = {
        'username' : {$eq: req.authData.username}
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
            return res.status(200).json(doc);
        } else {
            logger.debug(`User with ${data.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const updateMe = (req, res) => {
    
}

export const deleteMe = (req, res) => {
    
}

export const UpdateDp = (req, res) => {
    
}