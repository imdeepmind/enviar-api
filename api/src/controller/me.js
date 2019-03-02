import boom from 'boom';

import Users from "../models/users";

import { validationError, dbError, usernameExists, mainServerError, usernameError, passwordError } from '../messages';

export const GetMe = (req, res) => {
    const selectedField = {
        _id: 0,
        __v: 0,
    }

    Users.findOne({username:req.authData.username}, selectedField,  (err, doc) => {
        if (err) return res.status(503).json(boom.serverUnavailable(dbError));
        if (doc) return res.status(200).json(doc);
        return res.status(404).json(boom.notFound(usernameError));
    })
}

export const UpdateMe = (req, res) => {

}