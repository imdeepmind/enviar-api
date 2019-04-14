import mongoose from 'mongoose';
import Q from 'q';

import users from '../models/users';
import logger from '../utils/logger';
import processInput from '../utils/process-input';

export const findByID = id => {
    const deferred = Q.defer();
    const findQuery = {
        "_id" : {$eq: mongoose.Types.ObjectId(id)}
    }

    users.findById(findQuery, (err, doc) => {
        if (err) {
            deferred.reject(err);
            logger.debug('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        } else {
            deferred.resolve(false);
        }
    });

    return deferred.promise;
}

export const findByUsername = username => {
    const deferred = Q.defer();

    username = processInput(username, 'username');
    if (!username){
        deferred.reject('Invalid username');
    }
        

    const findQuery = {
        "username" : {$eq: processInput(username, 'username')}
    }

    users.findOne(findQuery, (err, doc) => {
        if (err) {
            deferred.reject(err);
            logger.debug('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        } else {
            deferred.resolve(false);
        }
    })

    return deferred.promise;
}

// export const insert = () => {
//     const deferred = Q.defer();
// }