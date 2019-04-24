import xss from 'xss';

import userModel from '../models/users';
import logger from '../utils/logger';
import messages from '../messages';

export const follow = (req, res) => {
    const me = xss(req.authData.username);
    const target = xss(req.params.username);

    const findQuery1 = {
        username: me, followee: {$ne: target}
    }

    const findQuery2 = {
        username: {$eq: target}
    }

    const update1 = {
        $push: {followee: target}
    }

    const update2 = {
        $push: {followers: me}
    }

    userModel.findOneAndUpdate(findQuery1, update1, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc){
            userModel.findOneAndUpdate(findQuery2, update2, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else if (doc) {
                    logger.debug( `User with ${target} now following ${me} `);
                    return res.status(201).json({
                        followee: me,
                        followers: target
                    })
                } else {
                    logger.debug(`User does not exist`);
                    return res.boom.notFound(messages['m404.0']);
                }
            })
        } else {
            logger.debug(`User does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const unfollow = (req, res) => {
    const me = xss(req.authData.username);
    const target = xss(req.params.username);

    const findQuery1 = {
        username: me, followee: {$eq: target}
    }

    const findQuery2 = {
        username: {$eq: target}
    }

    const update1 = {
        $pull: {followee: target}
    }

    const update2 = {
        $pull: {followers: me}
    }

    userModel.findOneAndUpdate(findQuery1, update1, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc){
            userModel.findOneAndUpdate(findQuery2, update2, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else if (doc) {
                    logger.debug( `User with ${target} not following ${me} `);
                    return res.status(201).json({
                        followee: me,
                        followers: target
                    })
                } else {
                    logger.debug(`User does not exist`);
                    return res.boom.notFound(messages['m404.0']);
                }
            })
        } else {
            logger.debug(`User does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const block = (req, res) => {
    const me = xss(req.authData.username);
    const target = xss(req.params.username);

    const findQuery = {
        username: me, blocked: {$ne: target}
    }

    const update = {
        $push: {blocked: target}
    }

    userModel.findOneAndUpdate(findQuery, update, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc){
            logger.debug( `User with ${target} username blocked by ${me} username `);
            return res.status(201).json({
                blocked: target
            })
        } else {
            logger.debug(`User does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const unblock = (req, res) => {
    const me = xss(req.authData.username);
    const target = xss(req.params.username);

    const findQuery = {
        username: me, blocked: {$eq: target}
    }

    const update = {
        $pull: {blocked: target}
    }

    userModel.findOneAndUpdate(findQuery, update, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc){
            logger.debug( `User with ${target} username unblocked by ${me} username `);
            return res.status(201).json({
                unblocked: target
            })
        } else {
            logger.debug(`User does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}