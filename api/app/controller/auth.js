import xss from 'xss';
import mongoose from 'mongoose';

import usersModel from '../models/users';




import { insert, findByEmail, findByUsername, updateByUsername } from '../services/user-service';
import { comparePassword, generateHash, generateToken, generatePasswordHash } from '../utils/hash';
import logger from '../utils/logger';
import messages from '../messages';

export const register = (req, res) => {
    req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();
    req.check('password', 'Invalid password').isString().isLength({min:4, max:24}).isAlphanumeric().equals(req.body.conformPassword);
    req.check('email', 'Invalid email').isString().isLength({min:4, max:255}).isEmail();
    req.check('name', 'Invalid name').isString().isLength({min:4, max:255});
    req.check('gender', 'Invalid gender').isString().isIn(['m', 'f', 'o']);
    req.check('dob', 'Invalid date of birth').isString().isBefore();
    req.check('country', 'Invalid country').isString().isLength({min:4, max:255}).isAlphanumeric();

    const errors = req.validationErrors();
    if (errors) {
        logger.info('Validation didn\'t succeed');
        return res.boom.badRequest(messages['m400.2'], errors);
    }

    const data = {
        username: xss(req.body.username),
        password: req.body.password,
        email: xss(req.body.email),
        name: xss(req.body.name),
        gender: xss(req.body.gender),
        country: xss(req.body.country),
        dob: xss(req.body.dob)
    }

    const findQuery = {
        $or: [
            {'username' : {$eq: data.username}},
            {'email' : {$eq: data.email}}
        ]
    }
    const what =  {
        _id: 1
    }


    usersModel.findOne(findQuery, what, (err, doc) => {
        if (err) {
            logger.error('Database error: ', err);
            return res.boom.badImplementation(messages['m500.0']);
        } else if (doc) {
            logger.info(`Username ${data.username} exists in the db`);
            return res.boom.badRequest(messages['m400.0']);
        } else {
            generatePasswordHash(data.password)
            .then(hash => {
                data.password = hash;
                data._id = new mongoose.Types.ObjectId();
                const u = usersModel(data);

                u.save((err, doc) => {
                    if (err) {
                        logger.error('Database error: ', err);
                        return res.boom.badImplementation(messages['m500.0']);
                    } else if (doc) {
                        res.status(201).json({
                            name: doc.name,
                            username: doc.username,
                            email: doc.email,
                            country: doc.country,
                            dob: doc.dob,
                            gender: doc.gender,
                        })
                    }
                })
            })
            .catch(err => {
                logger.error('Bcrypt error', err);
                return res.boom.badImplementation(messages['m500.0']);
            })
            

            
        }
    })
}

export const login = (req, res) => {

}

export const checkUsername = (req, res) => {

}

export const checkEmail = (req, res) => {

}







// export const register = (req, res) => {
//     req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();
//     req.check('password', 'Invalid password').isString().isLength({min:4, max:24}).isAlphanumeric().equals(req.body.conformPassword);
//     req.check('email', 'Invalid email').isString().isLength({min:4, max:255}).isEmail();
//     req.check('name', 'Invalid name').isString().isLength({min:4, max:255});
//     req.check('gender', 'Invalid gender').isString().isIn(['m', 'f', 'o']);
//     req.check('dob', 'Invalid date of birth').isString().isBefore();
//     req.check('country', 'Invalid country').isString().isLength({min:4, max:255}).isAlphanumeric();

//     const errors = req.validationErrors();
//     if (errors) {
//         logger.info('Validation didn\'t succeed');
//         return res.boom.badRequest(messages['m400.2'], errors);
//     }
        
//     const data = {
//         username: xss(req.body.username),
//         password: req.body.password,
//         email: xss(req.body.email),
//         name: xss(req.body.name),
//         gender: xss(req.body.gender),
//         country: xss(req.body.country),
//         dob: xss(req.body.dob)
//     }

//     insert(data)
//     .then(resp => {
//         logger.info(`User with ${data.username} username account created`);
//         return res.status(201).json({
//             'message' : messages['m201.0'],
//             'data': resp
//         })
//     })
//     .catch(err => {
//         if (err === 'm400.0' || err === 'm400.1'){
//             return res.boom.badRequest(messages[err]);
//         } else if (err === 'm500.0'){
//             return res.boom.badImplementation(messages[err]);
//         }
//     })
// }

// export const login = (req, res) => {
//     req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();
//     req.check('password', 'Invalid password').isString().isLength({min:4, max:24}).isAlphanumeric();

//     const errors = req.validationErrors();
//     if (errors) {
//         logger.info('Validation didn\'t succeed');
//         return res.boom.badRequest(messages['m400.2'], errors);
//     }

//     const data = {
//         username: xss(req.body.username),
//         password: req.body.password,
//     }

//     findByUsername(data.username, {password: 1, tokenHash: 1, _id: 1, name: 1, avatar: 1})
//     .then(doc => {
//         comparePassword(doc.password, data.password)
//         .then(_ => {
//             let hash = '';
//             if (doc.tokenHash)
//                 hash = doc.tokenHash;
//             else {
//                 hash = generateHash();

//                 let update = {
//                     tokenHash: hash
//                 }


//                 updateByUsername(update, data.username)
//                 .then(_ => {
//                     console.log(_, 'asjdh')
//                     const token = generateToken(doc.username, doc.username, hash, doc.avatar, doc._id);

//                     return res.status(202).json({
//                         token: token
//                     })
//                 })
//                 .catch(_ => {
//                     console.log(_, 'catch')
//                     console.log(update, doc.username)
//                     return res.boom.badImplementation(messages[_]);
//                 })
//             }
//         })
//         .catch(err => {
//             if (err === 'm401.0'){
//                 return res.boom.unauthorized(messages[err]);
//             } else if (err === 'm500.0'){
//                 return res.boom.badImplementation(messages[err]);
//             }
//         })
//     })
//     .catch(err => {
//         if (err === 'm404.0'){
//             return res.boom.notFound(messages[err]);
//         } else if (err === 'm500.0'){
//             return res.boom.badImplementation(messages[err]);
//         }
//     })
// }

// export const checkUsername = (req, res) => {
//     req.check('username', 'Invalid username').isString().isLength({min:4, max:24}).isAlphanumeric();

//     const errors = req.validationErrors();
//     if (errors) {
//         logger.info('Validation didn\'t succeed');
//         return res.boom.badRequest(messages['m400.2'], errors);
//     }

//     const data = {
//         username: xss(req.params.username)
//     }

//     findByUsername(data.username, {_id: 1})
//     .then(_ => {
//         logger.info(`User with ${data.username} found`);
//         return res.status(201).json({
//             'message' : messages['m201.1'],
//             'data': true
//         })
//     })
//     .catch(err => {
//         if (err === 'm404.0'){
//             return res.boom.notFound(messages[err]);
//         } else if (err === 'm500.0'){
//             return res.boom.badImplementation(messages[err]);
//         }
//     })
// }

// export const checkEmail = (req, res) => {
//     req.check('email', 'Invalid email').isString().isLength({min:4, max:255}).isEmail();

//     const errors = req.validationErrors();
//     if (errors) {
//         logger.info('Validation didn\'t succeed');
//         return res.boom.badRequest(messages['m400.2'], errors);
//     }

//     const data = {
//         email: xss(req.params.email)
//     }

//     findByEmail(data.email, {_id: 1})
//     .then(_ => {
//         logger.info(`User with ${data.email} found`);
//         return res.status(201).json({
//             'message' : messages['m201.1'],
//             'data': true
//         })
//     })
//     .catch(err => {
//         if (err === 'm404.0'){
//             return res.boom.notFound(messages[err]);
//         } else if (err === 'm500.0'){
//             return res.boom.badImplementation(messages[err]);
//         }
//     })
// }