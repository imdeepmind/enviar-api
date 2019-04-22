import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import expressBoom from 'express-boom';

import logger from './utils/logger';
import connect from './utils/db'; 
import messages from './messages';

import config from './config/index';

import auth from './routes/v1/auth';
import me from './routes/v1/me';
import settings from './routes/v1/settings';
import users from './routes/v1/users';
import interactions from './routes/v1/interactions';

const app = express();

// Logging the NODE_ENV
logger.info(`The API is running as ${config.NODE_ENV.toUpperCase()}`);

// Connect the db
connect();

// Use CORS
app.use(cors({
    allowedOrigins: [config.WEB_PASS]
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
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    return next();
});

// Index route
app.get('/', (req, res) => {
    res.status(200).json({
        'status' : 'working',
        'message' : 'Welcome dude to the enviar'
    })
})

// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/me/', me);
app.use('/api/v1/settings', settings);
app.use('/api/v1/users/', users);
app.use('/api/v1/interactions/', interactions);

// Handling invalid routes
app.all('*', (req, res) => {
    logger.debug('Invalid route');
	return res.boom.notFound(messages['m404.1']);
});

// The is running at port
app.listen(config.PORT, () => {
    logger.info(`The API is running at port ${config.PORT}`);
});