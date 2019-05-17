import xss from 'xss';

import { isBlocked, followSomeone, unFollowSomeone } from '../services';

import userModel from '../models/users';
import logger from '../utils/logger';
import messages from '../messages';

export const follow = (req, res) => {
    const me = xss(req.authData.username);
    const you = xss(req.params.username);

    isBlocked(me, you).then(resp => {
        if (resp){
            logger.debug(`User blocked`);
            return res.boom.notFound(messages['m404.0']);
        } else {
            followSomeone(me, you).then(resp => {
                if (resp) {
                    return res.status(201).json({
                        followee: me,
                        followers: you
                    })
                } else {
                    logger.debug(`User blocked`);
                    return res.boom.notFound(messages['m404.0']);
                }
            })
            .catch(err => {
                logger.error('Database error: ', err);
                return res.boom.badImplementation(messages['m500.0']);
            })
        }
        
    })
    .catch(err => {
        logger.error('Database error: ', err);
        return res.boom.badImplementation(messages['m500.0']);
    })
}

export const unfollow = (req, res) => {
    const me = xss(req.authData.username);
    const you = xss(req.params.username);

    isBlocked(me, you).then(resp => {
        if (resp){
            logger.debug(`User blocked`);
            return res.boom.notFound(messages['m404.0']);
        } else {
            unFollowSomeone(me, you).then(resp => {
                if (resp) {
                    return res.status(201).json({
                        followee: me,
                        followers: you
                    })
                } else {
                    logger.debug(`User blocked`);
                    return res.boom.notFound(messages['m404.0']);
                }
            })
            .catch(err => {
                logger.error('Database error: ', err);
                return res.boom.badImplementation(messages['m500.0']);
            })
        }
        
    })
    .catch(err => {
        logger.error('Database error: ', err);
        return res.boom.badImplementation(messages['m500.0']);
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