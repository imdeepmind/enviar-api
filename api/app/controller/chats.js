import xss from 'xss';

import chatModel from '../models/chats';
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

}

export const postChat = (req, res) => {

}

export const deleteChat = (req, res) => {

}