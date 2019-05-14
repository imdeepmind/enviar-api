import xss from 'xss';
import mongoose from 'mongoose';

import chatModel from '../models/chats';
import userModel from '../models/users';

import logger from '../utils/logger';
import messages from '../messages';


export const getChats = (req, res) => {
    let page = xss(req.query.page);
    let limit = xss(req.query.limit);
    
    if (!page || page < 0) page = 0;
    if (!limit || limit <= 0) limit = 10;

    const me = xss(req.authData.username);
    const findQuery = {
        $or: [
            {'author' : {$eq: me}},
            {'to' : {$eq: me}}
        ]
    }

    const selectedField = {
        _id: 1, author: 1, to: 1, message: 1, createdAt: 1
    }

    chatModel.find(findQuery, selectedField, {limit: limit, skip: page * limit}, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            logger.debug('Returning some chats');
            return res.status(200).json(doc);
        }
    })
}

export const getChat = (req, res) => {
    const findQuery = {
        $or: [
            {'author' : {$eq: me}},
            {'to' : {$eq: me}}
        ],
        _id: mongoose.Schema.Types.ObjectId(req.params.id)
    }

    const selectedField = {
        _id: 1, author: 1, to: 1, message: 1, createdAt: 1
    }

    chatModel.find(findQuery, selectedField, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            logger.debug('Returning some chats');
            return res.status(200).json(doc);
        }
    })
}

export const postChat = (req, res) => {
    req.check('message', 'Invalid message').isString().isLength({min:4, max:255});

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const findQuery = {
        'username' : {$eq: xss(req.authData.username)}
    }

    const selectedField = { _id: 1, blocked: 1 }

    userModel.findOne(findQuery, selectedField, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            if (doc.blocked.includes(req.params.username)){
                logger.debug('user blocked');
                return res.boom.badRequest(messages['m400.3']);
            } else {
                const newChat = new chatModel({
                    _id: new mongoose.Types.ObjectId(),
                    author: xss(req.authData.username),
                    to: xss(req.params.username),
                    message: xss(req.body.message)
                })

                newChat.save((err, doc) => {
                    if (err) {
                        logger.error('Database error: ', err);
                        return res.boom.badImplementation(messages['m500.0']);
                    } else {
                        res.status(201).json({
                            author: xss(req.authData.username),
                            to: xss(req.params.username),
                            message: xss(req.body.message)
                        })
                    }
                })
            }
        }
    })
}

export const deleteChat = (req, res) => {
    const findQuery = {
        _id: new mongoose.Schema.Types.ObjectId(req.params.id),
        author: {$eq: req.authData.username}
    }

    chatModel.findOneAndRemove(findQuery, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            return res.status(200).json({
                id: req.params.id
            })
        } else {
            logger.debug('message don\'t exist');
            return res.boom.notFound(messages['m404.m404.2']);
        }
    })
}
