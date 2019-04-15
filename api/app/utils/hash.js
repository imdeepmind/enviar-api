import bcrypt from 'bcrypt';
import Q from 'q';

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
            deferred.reject(err);
        } else if (hash) {
            deferred.resolve(hash);
        }
    })

    return deferred.promise;
}

export const comparePassword = (old_pas, new_pass) => {
    const deferred = Q.defer();

    bcrypt.compare(old_pas, new_pass, (err, hash) => {
        if (err) {
            deferred.reject(err);
        } else if (hash) {
            deferred.resolve(hash);
        }
    })

    return deferred.promise;
}