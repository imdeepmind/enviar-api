import bcrypt from 'bcrypt';
import Q from 'q';

import logger from '../utils/logger';

export const generateHash = () => {
    const length = 20;
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export const generatePasswordHash = password => {
    const deferred = Q.defer();

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            logger.info(`bcrypt hash error`, err);
            deferred.reject(err);
        } else if (hash) {
            deferred.resolve(hash);
        }
    })

    return deferred.promise;
}