import Q from 'q';

import userModel from '../models/users';

import logger from '../utils/logger';

export const isBlocked = (me, you) => {
    let deferred = Q.defer();
    const findQuery1 = {
        username: {$eq: me},
        target: {$ne: you}
    }

    const findQuery2 = {
        username: {$eq: you},
        target: {$ne: me}
    }

    const selectedField = {
        _id: 1, username: 1, blocked: 1
    }

    userModel.findOne(findQuery1, selectedField, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            deferred.reject(err);
        } else if (doc) {
            deferred.resolve(true);
        } else {
            userModel.findOne(findQuery2, selectedField, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    deferred.reject(err);
                } else if (doc) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            })
        }
    })

    return deferred.promise;
}

export const followSomeone = (me, you) => {
    let deferred = Q.defer();
    const findQuery1 = {
        username: me, followee: {$ne: you}
    }

    const findQuery2 = {
        username: {$eq: you}
    }

    const update1 = {
        $push: {followee: you}
    }

    const update2 = {
        $push: {followers: me}
    }

    userModel.findOneAndUpdate(findQuery1, update1, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            deferred,reject(err);
        } else if (doc) {
            userModel.findOneAndUpdate(findQuery2, update2, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    deferred,reject(err);
                } else if (doc) {
                    deferred.resolve(doc);
                } else {
                    deferred.resolve(false);
                }
            })
        } else {
            deferred.resolve(false);
        }
    })
}

export const unFollowSomeone = (me, you) => {
    const findQuery1 = {
        username: me, followee: {$eq: you}
    }

    const findQuery2 = {
        username: {$eq: you}
    }

    const update1 = {
        $pull: {followee: you}
    }

    const update2 = {
        $pull: {followers: me}
    }

    userModel.findOneAndUpdate(findQuery1, update1, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            deferred.reject(err);
        } else if (doc){
            userModel.findOneAndUpdate(findQuery2, update2, (err, doc) => {
                if (err) {
                    logger.error('Database error: ', err);
                    deferred.reject(err);
                } else if (doc) {
                    logger.debug( `User with ${target} not following ${me} `);
                    deferred.resolve(doc)
                } else {
                    logger.debug(`User does not exist`);
                    deferred.resolve(false);
                }
            })
        } else {
            logger.debug(`User does not exist`);
            deferred.resolve(false);
        }
    })
}