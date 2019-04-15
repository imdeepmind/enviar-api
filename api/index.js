import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { check } from 'express-validator/check';

import logger from './app/utils/logger';
import connect from './app/utils/db'; 

import { checkID, checkName, checkUsername, checkDob, checkEmail, checkGender } from './app/validators';

const app = express();
const port = process.env.PORT || 4999;
const webPass = process.env.WEBPASS || ['*'];

// Connect the db
connect();

// Use CORS
app.use(cors({
    allowedOrigins: [webPass]
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Log Incoming requests
app.all('*', (req, res) => {
    logger.info(`Incoming request: ${req.method}`);
    return next();
});


// AUTH
app.post('/login', [
    check('username')
    .custom(checkUsername),
    check('password')
    .isString()
    .isLength({min:4, max:24}),
],)



app.all('*', function (req, res, next) {
	const err = new Error();
	err.status = 404;
	next(err);
});
// insert({
//     "username" : "imdeepmind",
//     "password" : "12345",
//     "name" : "Abhishek Chatterjee",
//     "email" : "infinityatme@gmail.com",
//     "city" : "Guwahati",
//     "state" : "Assam",
//     "country" : "India",
//     "gender" : "m",
//     "dob" : "1997-01-17",
//     "avatar" : "",
//     "status" : "Sample status",
//     "bio" : "Sample bio"
// })
// .then(resp => {
//     logger.info('resp');
// })
// .catch(err => {
//     logger.info(err);
// })


app.listen(port, () => {
    logger.info(`The API is running at port ${port}`);
});