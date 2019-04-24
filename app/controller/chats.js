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
            logger.debug('Validation didn\'t succeed');
            return res.boom.badRequest(messages['m400.2'], err);
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
            logger.debug('Validation didn\'t succeed');
            return res.boom.badRequest(messages['m400.2'], err);
        } else {
            logger.debug('Returning some chats');
            return res.status(200).json(doc);
        }
    })
}

export const postChat = (req, res) => {
    req.check('status', 'Invalid status').isString().isLength({min:4, max:255});

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
            logger.debug('Validation didn\'t succeed');
            return res.boom.badRequest(messages['m400.2'], err);
        } else {
            if (doc.blocked.includes(req.params.username)){

            } else {
                const findQuery2 = {
                    
                }
            }
        }
    })
}

export const deleteChat = (req, res) => {

}