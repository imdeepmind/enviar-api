import mongoose, { mongo } from 'mongoose';
import Q from 'q';

import users from '../models/users';
import logger from '../utils/logger';
import { generatePasswordHash } from '../utils/hash';

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
        "username" : {$eq: username}
    }

    users.findOne(findQuery, fields, (err, doc) => {
        if (err) {
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        } else {
            deferred.reject(false);
        }
    })

    return deferred.promise;
}

export const findByEmail = (email, fields) => {
    const deferred = Q.defer();
    const findQuery = {
        "email" : {$eq: email}
    }

    users.findOne(findQuery, fields, (err, doc) => {
        if (err) {
            deferred.reject(err);
            logger.info('Database error', err);
        } else if (doc) {
            deferred.resolve(doc);
        } else {
            deferred.reject(false);
        }
    })

    return deferred.promise;
}

export const insert = dt => {
    const deferred = Q.defer();

    dt._id = new mongoose.Types.ObjectId();

    findByUsername(dt.username)
    .then(_ => {
        logger.info(`Username ${dt.username} already exists`);
        deferred.reject('m400.0'); 
    })
    .catch(_ => {
        findByEmail(dt.email)
        .then(_ => {
            logger.info(`Email ${dt.email} already exists`);
            deferred.reject('m400.0'); 
        }) 
        .catch(_ => {
            generatePasswordHash(dt.password)
            .then(hash => {
                dt.password = hash;
                const u = users(dt);
                u.save((err, doc) => {
                    if (err){
                        deferred.reject('m500.0');
                        logger.info('Database error ', err);
                    } else if (doc) {
                        deferred.resolve({
                            name: doc.name,
                            username: doc.username,
                            email: doc.email,
                            country: doc.country,
                            dob: doc.dob,
                            gender: doc.gender,
                        });
                    }
                })
            })
            .catch(err => {
                logger.info(`bcrypt hash error`, err);
                deferred.reject('m500.0');
            })
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