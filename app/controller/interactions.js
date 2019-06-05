import xss from 'xss';

import { isBlocked, followSomeone, unFollowSomeone, blockSomeone, unBlockSomeone } from '../services/interactionService';

import logger from '../utils/logger';
import messages from '../messages';

export const follow = (req, res) => {
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24});

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

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
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24});

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }
    
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
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24});

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const me = xss(req.authData.username);
    const you = xss(req.params.username);

    isBlocked(me, you).then(resp => {
        if (resp){
            logger.debug(`User already blocked`);
            return res.status(201).json({
                blocked: you
            })
        } else {
            unFollowSomeone(me, you).then(resp => {
                unFollowSomeone(you, me).then(resp => {
                    blockSomeone(me, you).then(resp => {
                        if (resp) {
                            logger.debug( `User with ${you} username blocked by ${me} username `);
                            return res.status(201).json({
                                blocked: you
                            })
                        } else {
                            logger.debug(`User dont exist`);
                            return res.boom.notFound(messages['m404.0']);
                        }
                    })
                    .catch(err => {
                        logger.error('Database error: ', err);
                        return res.boom.badImplementation(messages['m500.0']);
                    })
                })
                .catch(err => {
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                })
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

export const unblock = (req, res) => {
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24});

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }
    
    const me = xss(req.authData.username);
    const you = xss(req.params.username);

    isBlocked(me, you).then(resp => {
        if (resp){
            unBlockSomeone(me, you).then(resp => {
                if (resp) {
                    logger.debug( `User with ${you} username unblocked by ${me} username `);
                    return res.status(201).json({
                        unblocked: you
                    })
                } else {
                    logger.debug(`User don't exist`);
                    return res.boom.notFound(messages['m404.0']);
                }
            })
            .catch(err => {
                logger.error('Database error: ', err);
                return res.boom.badImplementation(messages['m500.0']);
            })
        } else {
            logger.debug(`User already unblocked`);
            return res.status(201).json({
                blocked: you
            })
        }
    })
    .catch(err => {
        logger.error('Database error: ', err);
        return res.boom.badImplementation(messages['m500.0']);
    })
}
