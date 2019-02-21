import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator/check';
import xss from 'xss';
import boom from 'boom';

import Users from '../models/users';
import { validationError, dbError, usernameExists, mainServerError, usernameError, passwordError } from '../messages';
import { generateHash } from '../methods';
import { jwtKey } from '../config';

export const Login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(boom.badData(validationError, errors.array()));
    }

    const username = xss(req.body.username);
    const password = xss(req.body.password);

    const selectedField = {
        _id: 0,
        __v: 0,
        email: 0,
        phoneNumber: 0,
        city: 0,
        state: 0,
        country: 0,
        gender: 0,
        dob: 0,
        cover: 0,
        status: 0,
        bio: 0,
        createdAt: 0
    }

    Users.findOne({username:username}, selectedField, (err, doc) => {
        if (err){
            return res.json(boom.serverUnavailable(dbError));
        } else if (doc) {
            bcrypt.compare(password, doc.password, (err, hash) => {
                if (err) {
                    return res.json(boom.serverUnavailable(mainServerError))
                } else if (hash) {
                    let tokenHash = "";
                    if (doc.tokenHash){
                        tokenHash = doc.tokenHash;
                    } else {
                        tokenHash = generateHash();
                    }
                    Users.findOneAndUpdate({username:username},{tokenHash:tokenHash}, (err, _) => {
                        if (err) {
                            return res.json(boom.serverUnavailable(dbError));
                        } else if (_) {
                            const token = jwt.sign(
                                {
                                    name: doc.name,
                                    username: doc.username,
                                    hash: tokenHash,
                                    avatar: doc.avatar,
                                    obj_id: doc._id,
                                }, jwtKey, { expiresIn: '3d' }
                            )
        
                            return res.status(202).json({
                                token: token
                            })
                        }
                    })
                } else {
                    return res.json(boom.unauthorized(passwordError));
                }
            })
        } else {
            return res.json(boom.notFound(usernameError));
        }
    })
}

export const Register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(boom.badData(validationError,  errors.array()));
    }

    const name = xss(req.body.name);
    const email = xss(req.body.email);
    const username = xss(req.body.username);
    const password = xss(req.body.password);
    const country = xss(req.body.country);
    const gender = xss(req.body.gender);
    const dob = xss(req.body.dob);

    const selectedField = {
        _id: 0,
        __v: 0,
        tokenHash: 0,
        name: 0,
        password: 0,
        phoneNumber: 0,
        city: 0,
        state: 0,
        country: 0,
        gender: 0,
        dob: 0,
        avatar: 0,
        cover: 0,
        status: 0,
        bio: 0,
        createdAt: 0
    }

    Users.findOne({
        $or: [ {username: username}, {email: email}]
    }, selectedField, (err, doc) => {
        if (err){
            return res.json(boom.serverUnavailable(dbError));
        } else if (doc) {
            return res.json(boom.conflict(usernameExists));
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.json(boom.serverUnavailable(mainServerError))
                } else if (hash) {
                    const newUser = Users({
                        _id: new mongoose.Types.ObjectId(),
                        name: name,
                        email: email,
                        username: username,
                        country: country,
                        dob: dob,
                        gender: gender,
                        password: hash,
                    });

                    newUser.save((err, doc) => {
                        if (err) {
                            return res.json(boom.serverUnavailable(dbError))
                        } else if (doc) {
                            return res.status(201).json({
                                name: doc.name,
                                username: doc.username,
                                email: doc.email,
                                country: doc.country,
                                dob: doc.dob,
                                gender: doc.gender,
                            })
                        }
                    })
                }
            })
        }
    })
}

export const CheckUsername = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(boom.badData(validationError, errors.array()));
    }

    const username = xss(req.query.username);

    const selectedField = {
        _id: 0,
        __v: 0,
        tokenHash: 0,
        name: 0,
        password: 0,
        email: 0,
        phoneNumber: 0,
        city: 0,
        state: 0,
        country: 0,
        gender: 0,
        dob: 0,
        avatar: 0,
        cover: 0,
        status: 0,
        bio: 0,
        createdAt: 0
    }

    Users.findOne({username:username}, selectedField, (err, doc) => {
        if (err){
            return res.json(boom.serverUnavailable(dbError));
        } else if (doc) {
            return res.status(200).json({
                username: doc.username
            })
        } else {
            return res.json(boom.notFound(usernameError));
        }
    })
}