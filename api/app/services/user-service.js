import mongoose, { mongo } from 'mongoose';
import Q from 'q';

import users from '../models/users';
import logger from '../utils/logger';
import processInput from '../utils/process-input';

export const findByID = (id, fields) => {
    const deferred = Q.defer();
    const findQuery = {
        "_id" : {$eq: mongoose.Types.ObjectId(id)}
    }

    users.findById(findQuery, fields, (err, doc) => {
        if (err) {
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        } else {
            deferred.resolve(false);
        }
    });

    return deferred.promise;
}

export const findByUsername = (username, fields) => {
    const deferred = Q.defer();
    const findQuery = {
        "username" : {$eq: processInput(username, 'username')}
    }

    users.findOne(findQuery, fields, (err, doc) => {
        if (err) {
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        } else {
            deferred.resolve(false);
        }
    })

    return deferred.promise;
}

export const insert = dt => {
    const deferred = Q.defer();

    dt._id = new mongoose.Types.ObjectId();

    const u = users(dt);

    findByUsername(dt.username)
    .then(resp => {
        logger.info(`Username ${dt.username} already exists`);
        deferred.reject('Username already exists'); 
    })
    .catch(_ => {
        u.save((err, doc) => {
            if (err){
                deferred.reject(err);
                logger.info('Database error', err);
            } else if (doc) {
                deferred.resolve(doc);
            }
        })
    })

    return deferred.promise;
}

export const updateByID = (dt, id) => {
    const deferred = Q.defer();
    
    const findQuery = {
        '_id' : {$eq: mongoose.Types.ObjectId(id)}
    }

    users.findOneAndUpdate(findQuery, dt, (err, doc) => {
        if (err){
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        }
    })

    return deferred.promise;
}

export const updateByUsername = (dt, id) => {
    const deferred = Q.defer();
    
    const findQuery = {
        'username' : {$eq: username}
    }

    users.findOneAndUpdate(findQuery, dt, (err, doc) => {
        if (err){
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        }
    })

    return deferred.promise;
}

export const DeleteByID = id => {
    const deferred = Q.defer();
    
    const findQuery = {
        '_id' : {$eq: mongoose.Types.ObjectId(id)}
    }

    users.findOneAndRemove(findQuery, (err, doc) => {
        if (err){
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        }
    })

    return deferred.promise;
}

export const DeleteByUsername = id => {
    const deferred = Q.defer();
    
    const findQuery = {
        'username' : {$eq: username}
    }

    users.findOneAndRemove(findQuery, (err, doc) => {
        if (err){
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        }
    })

    return deferred.promise;
}