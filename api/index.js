import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import expressBoom from 'express-boom';

import logger from './app/utils/logger';
import connect from './app/utils/db'; 

import auth from './app/routes/v1/auth';

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

// Validator
app.use(expressValidator());

// Boom error
app.use(expressBoom());

// Log Incoming requests
app.all('*', (req, res, next) => {
    logger.info(`Incoming request: ${req.method} : ${req.url}`);
    return next();
});

// Auth
app.use('/api/v1/auth', auth);

// Handling invalid routes
app.all('*', function (req, res, next) {
    logger.info('hitting a 404');
	const err = new Error();
	err.status = 404;
	next(err);
});

// The is running at port
app.listen(port, () => {
    logger.info(`The API is running at port ${port}`);
});