import xss from 'xss';

import userModel from '../models/users';
import messages from '../messages';
import logger from '../utils/logger';

export const getMe = (req, res) => {
    const findQuery = {
        'username' : {$eq: xss(req.authData.username)}
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
            logger.debug(`User with ${req.authData.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const updateMe = (req, res) => {
    req.check('email', 'Invalid email').isString().isLength({min:4, max:255}).isEmail().optional();
    req.check('name', 'Invalid name').isString().isLength({min:4, max:255}).optional();
    req.check('gender', 'Invalid gender').isString().isIn(['m', 'f', 'o']).optional();
    req.check('dob', 'Invalid date of birth').isString().isBefore().optional().custom(date => {
        return date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
    }).optional();
    req.check('country', 'Invalid country').isString().isLength({min:4, max:255}).optional();
    req.check('city', 'Invalid city').isString().isLength({min:4, max:255}).optional();
    req.check('state', 'Invalid state').isString().isLength({min:4, max:255}).optional();
    req.check('status', 'Invalid status').isString().isLength({min:4, max:255}).optional();
    req.check('bio', 'Invalid bio').isString().isLength({min:24, max:1024}).optional();
    
    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const findQuery = {
        username: {$eq: xss(req.authData.username)}
    }

    const update = {}

    if (req.body.name) update['name'] = xss(req.body.name);
    if (req.body.email) update['email'] = xss(req.body.email);
    if (req.body.city) update['city'] = xss(req.body.city);
    if (req.body.state) update['state'] = xss(req.body.state);
    if (req.body.country) update['country'] = xss(req.body.country);
    if (req.body.gender) update['gender'] = xss(req.body.gender);
    if (req.body.dob) update['dob'] = xss(req.body.dob);
    if (req.body.status) update['status'] = xss(req.body.status);
    if (req.body.bio) update['bio'] = xss(req.body.bio);
    
    update['updatedAt'] = Date();
    update['isActive'] = true;

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
                city: doc.city,
                state: doc.state,
                status: doc.status,
                bio: doc.bio,
                avatar: doc.avatar
            });
        } else {
            logger.debug(`User with ${req.authData.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
    
}

export const deleteMe = (req, res) => {
    const findQuery = {
        username: {$eq: xss(req.authData.username)}
    }

    userModel.findOneAndRemove(findQuery, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.debug(`Deleted user with username ${req.authData.username}`);
            return res.status(204).json({});
        } else {
            logger.debug(`User with ${req.authData.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const updateDp = (req, res) => {
    const findQuery = {
        username: xss(req.authData.username)
    }

    const update = {
        avatar: req.file.filename
    }

    userModel.findOneAndUpdate(findQuery, update, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.debug(`Updated avatar of user with ${doc.username} username`);
            return res.status(200).json({
                avatar: req.file.filename + '.jpg'
            });
        } else {
            logger.debug(`User with ${req.authData.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const getFollowing = (req, res) => {
    const findQuery = {
        username: {$eq: xss(req.authData.username)}
    }

    let page = Number(xss(req.query.page));
    let limit = Number(xss(req.query.limit));

    if (!page || page <= 0) page = 1;
    if (!limit || limit <= 0) limit = 10;

    const selectedField = {
        followee: 1
    }

    userModel.findOne(findQuery, selectedField, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            const followee = doc.followee;
            const findQuery2 = {
                followee: {$in: followee}
            }

            const selectedField2 = {
                username: 1, name: 1, avatar: 1, status: 1
            }

            userModel.find(findQuery2, selectedField2, {limit: limit, skip: (page-1) * limit}, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else {
                    return res.status(200).json(doc);
                }
            })
        } else {
            logger.debug(`User with ${req.authData.username} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })    

}