import jwt from 'jsonwebtoken';
import xss from 'xss';
import boom from 'boom';

import { jwtKey } from '../config';
import users from '../models/users';
import { serverUnavailable, unauthorized } from '../messages';

export const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token){
        jwt.verify(token, jwtKey, (err, authData) => {
            if (err) return res.status(503).json(boom.serverUnavailable(serverUnavailable));

            users.findOne({username: authData.username, tokenHash: authData.hash}, (err, doc) => {
                if (err) return res.status(503).json(boom.serverUnavailable(serverUnavailable));
                if (doc) req.authData = authData || next();
                return res.status(401).json(boom.unauthorized(unauthorized));
            }) 
        });
    }
}