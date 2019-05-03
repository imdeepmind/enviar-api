import xss from 'xss';

import userModel from '../models/users';
import logger from '../utils/logger';
import messages from '../messages';

export const getOne = (req, res) => {
    const findQuery2 = {
        username: {$eq: xss(req.authData.username)}
    }

    const selectedField = {
        username: 1, name: 1, email: 1, city: 1, state: 1, country: 1,
        gender: 1, dob: 1, avatar: 1, status: 1, bio: 1,
        createdAt: 1, updatedAt: 1, isActive: 1,  followee: 1, followers: 1
    }

    const selectedField2 = {
        blocked: 1,
        followee: 1,
        followers: 1
    }

    userModel.findOne(findQuery2, selectedField2, (err, doc1) => {
        if (err){
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            if (!doc1.blocked.includes(req.params.username)){
                const findQuery = {
                    username: {$eq: xss(req.params.username)},
                }

                userModel.findOne(findQuery, selectedField, (err, doc) => {
                    if (err) {
                        logger.error('Database error: ', err);
                        return res.boom.badImplementation(messages['m500.0']);
                    } else if (doc) {
                        logger.debug(`Returned with user ${doc.username}`);

                        let data = doc.toJSON();

                        if (doc1.followers.includes(req.authData.username))
                            data['isFollowers'] = true;
                        else
                            data['isFollowers'] = false;

                        if (doc1.followee.includes(req.authData.username))
                            data.isFollowee = true;
                        else
                            data.isFollowee = false;

                        if (doc1.blocked.includes(req.authData.username))
                            data.isBlocked = true;
                        else
                            data.isBlocked = false;

                        return res.status(200).json(data);
                    } else {
                        logger.debug(`User with ${doc.username} does not exist`);
                        return res.boom.notFound(messages['m404.0']);
                    }
                })
            } else {
                logger.debug(`User with ${req.params.username} does not exist`);
                return res.boom.notFound(messages['m404.0']);
            }
        }
    })
}

export const getAll = (req, res) => {
    let page = Number(xss(req.query.page));
    let limit = Number(xss(req.query.limit));

    if (!page || page < 0) page = 0;
    if (!limit || limit <= 0) limit = 10;

    const findQuery2 = {
        username: {$eq: xss(req.authData.username)}
    }

    const selectedField = {
        username: 1, name: 1, country: 1, gender: 1, dob: 1, avatar: 1, status: 1,
        createdAt: 1, updatedAt: 1, isActive: 1,  followee: 1, followers: 1
    }

    const selectedField2 = {
        blocked: 1,
        followee: 1,
        followers: 1
    }

    userModel.findOne(findQuery2, selectedField2, (err, doc1) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            let findQuery = {}
            if (doc1.blocked.length > 0){
                findQuery = {
                    username: {$ne: xss(req.authData.username)},
                    username: {$ne: doc1.blocked}
                }
            } else {
                findQuery = {
                    username: {$ne: xss(req.authData.username)}
                }
            }

            userModel.find(findQuery, selectedField, {limit: limit, skip: page * limit}, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else if (doc) {
                    logger.debug(`Returned some users`);

                    let data = [];

                    for (let i = 0; i< doc.length; i++){
                        let dt = doc[i].toJSON();
                        if (doc1.followers.includes(dt.username))
                            dt['isFollowers'] = true;
                        else
                            dt['isFollowers'] = false;

                        if (doc1.followee.includes(dt.username))
                            dt.isFollowee = true;
                        else
                            dt.isFollowee = false;

                        if (doc1.blocked.includes(dt.username))
                            dt.isBlocked = true;
                        else
                            dt.isBlocked = false;

                        data.push(dt);
                    }

                    return res.status(200).json(data);
                } else {
                    logger.debug(`User with ${doc.username} does not exist`);
                    return res.boom.notFound(messages['m404.0']);
                }
            })
        }
    })
}
