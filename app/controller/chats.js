import xss from 'xss';
import mongoose from 'mongoose';

import chatModel from '../models/chats';
import userModel from '../models/users';

import logger from '../utils/logger';
import messages from '../messages';

const  mergeArrays = (...arrays) => {
    let jointArray = []

    arrays.forEach(array => {
        jointArray = [...jointArray, ...array]
    })
    const uniqueArray = jointArray.filter((item,index) => jointArray.indexOf(item) === index)
    return uniqueArray
}

export const allPeoples = (req, res) => {
    let page = xss(req.query.page);
    let limit = xss(req.query.limit);

    if (!page || page < 0) page = 0;
    if (!limit || limit <= 0) limit = 10;

    const findQuery = {
        username: {$eq: xss(req.authData.username)}
    }

    const selectedField = {
        _id: 1, followers: 1, followee: 1
    }

    const selectedField2 = {
        username: 1, name: 1, email: 1, city: 1, state: 1, country: 1,
        gender: 1, dob: 1, avatar: 1, status: 1, bio: 1,
        createdAt: 1, updatedAt: 1, isActive: 1,  followee: 1, followers: 1
    }

    userModel.findOne(findQuery, selectedField, (err, doc) => {
        if (err){
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            const peoples = mergeArrays(doc.followee, doc.followers);
            const findQuery2 = {
                username: {$in: peoples}
            }

            userModel.find(findQuery2, selectedField2, {limit: limit, skip: page * limit}, (err, doc) => {
                if (err){
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else {
                    logger.debug(`Returned with chat users`);
                    return res.status(200).json(doc);
                }
            })
        }
    })
}

export const getChatsByUsername = (req, res) => {
    let page = Number(xss(req.query.page));
    let limit = Number(xss(req.query.limit));

    if (!page || page <= 0) page = 1;
    if (!limit || limit <= 0) limit = 10;

    const me = xss(req.authData.username);
    const you = xss(req.params.username);

    const findQuery = {
        $and: [
            {'author' : {$in: [you, me]}},
            {'to' : {$in: [you, me]}}
        ]
    }

    const findQuery2 = {
        username: {$eq: you}
    }

    const selectedField = {
        _id: 1, author: 1, to: 1, message: 1, createdAt: 1
    }

    const selectedField2 = {
      _id: 1, username: 1, name: 1, avatar: 1, status: 1
    }

    const order = {
      createdAt: -1
    }

    userModel.findOne(findQuery2, selectedField2, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            const you2 = doc.toJSON();
            chatModel.paginate(findQuery, {select: selectedField,sort: order, page: page, limit: limit}, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else {
                  logger.debug('Returning some chats');
                  doc.you = you2;
                  return res.status(200).json(doc);
                }
            })
        }
    })
}

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
