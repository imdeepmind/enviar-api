import xss from 'xss';
import mongoose from 'mongoose';

import postModel from '../models/posts';
import userModel from '../models/users';

import logger from '../utils/logger';
import messages from '../messages';

export const getPosts = (req, res) => {
    let page = Number(xss(req.query.page));
    let limit = Number(xss(req.query.limit));
    
    if (!page || page < 0) page = 1;
    if (!limit || limit <= 0) limit = 10;

    const me = xss(req.authData.username);
    
    const findQuery = {
        username: {$eq: me}
    }

    const selectedField = {
        _id: 1, followee: 1
    }

    userModel.find(findQuery, selectedField, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            const followee = doc[0].followee;
	
            const findQuery2 = {
                $or: [
                    {"author" : {$eq: me}},
                    {"author" : {$in: followee}}
                ]
            }

            postModel.count(findQuery2, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    return res.boom.badImplementation(messages['m500.0']);
                } else { 
                    const totalItems = doc;
                    postModel.aggregate([
                        {
                            $match: {
                                $or: [
                                    {"author" : {$eq: me}},
                                    {"author" : {$in: followee}}
                                ]
                            }
                        }, 
                        {
                            $lookup: {
                                from: 'users',
                                localField : 'author',
                                foreignField : 'username',
                                as: 'author'
                            }
                        }, 
                        {
                            $project: {
                                '_id' : 1,
                                'content' : 1,
                                'caption' : 1,
                                'createdAt': 1, 
                                'updatedAt': 1,
                                'author._id' : 1,
                                "author.username" : 1,
                                'author.avatar' : 1,
				'author.status' : 1
                            }
                        },
                        {
                            $sort: {"updatedAt": -1}
                        },
                        {
                            $skip: (page-1) * limit
                        },
                        {
                            $limit: limit
                        },
                    ]).exec((err, doc) => {
                        if (err) {
                            logger.error('Database error: ', err);
                            return res.boom.badImplementation(messages['m500.0']);
                        } else {
                            logger.debug('Returning some posts');
                            const data = {
                                docs: doc,
                                total: totalItems,
                                limit: limit,
                                page: page,
                                pages: Math.ceil(totalItems / limit)
                            }
                            return res.status(200).json(data);
                        }
                    })
                }
            })

           
        }
    })
}

export const getPotsById = (req, res) => {
    const findQuery = {
        _id: {$eq: xss(req.params.id)}
    }

    const selectedField = {
        author: 1, content: 1, caption: 1, createdAt: 1, updatedAt: 1, _id: 1
    }

    postModel.findOne(findQuery, selectedField, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else {
            logger.debug('Returning some posts');
            return res.status(200).json(doc);
        }
    })
}

export const addPost = (req, res) => {
    req.check('caption', 'Invalid caption').isString().isLength({min:4, max:255}).optional();

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const data = {
        _id:  new mongoose.Types.ObjectId(),
        author: xss(req.authData.username),
        content: req.file.filename
    }

    if (req.body.caption) data['caption'] = xss(req.body.caption);

    const post = new postModel(data);

    post.save((err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.debug(`Post added`);
            return res.status(201).json({
                _id: doc._id,
                author: doc.author,
                content: doc.content,
                caption: doc.caption,
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt
            });
        }
    })
}

export const editPost = (req, res) => {
    req.check('caption', 'Invalid caption').isString().isLength({min:4, max:255});

    const errors = req.validationErrors();
    if (errors) {
        logger.debug('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const findQuery = {
        _id: {$eq: mongoose.Types.ObjectId(req.params.id)}
    }

    let data = {};

    if (req.body.caption) data['caption'] = xss(req.body.caption);

    data['updatedAt'] = Date();

    postModel.findOneAndUpdate(findQuery, data, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc){
            return res.status(201).json(data);
        } else {
            logger.debug(`Post with ${req.params.id} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}

export const deletePost = (req, res) => {
    const findQuery = {
        _id: {$eq: mongoose.Types.ObjectId(req.params.id)}
    }

    postModel.findOneAndRemove(findQuery, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc){
            return res.status(204).json({
                deleted: req.params.id
            });
        } else {
            logger.debug(`Post with ${req.params.id} does not exist`);
            return res.boom.notFound(messages['m404.0']);
        }
    })
}
