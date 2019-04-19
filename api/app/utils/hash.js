import bcrypt from 'bcrypt';
import Q from 'q';
import jwt from 'jsonwebtoken';

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
            deferred.reject('m500.0');
        } else if (hash) {
            deferred.resolve(hash);
        }
    })

    return deferred.promise;
}

export const comparePassword = (old_pass, new_pass) => {
    const deferred = Q.defer();
    bcrypt.compare(new_pass, old_pass, (err, hash) => {
        if (err) {
            deferred.reject('m500.0');
        } else if (hash) {
            deferred.resolve(hash);
        }
        deferred.reject('m401.0');
    })

    return deferred.promise;
}

export const generateToken = (name, username, hash, avatar, id) => {
    const jwtKey = process.env.JWTTOKEN || 'gasdhqegrq78jewnjbsdf6';
    const token = jwt.sign({
        name: name,
        username: username,
        hash: hash,
        avatar: avatar,
        obj_id: id,
    }, jwtKey, { expiresIn: '3d' })

    return token;
}