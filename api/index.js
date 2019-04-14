import express from 'express';
import cors from 'cors';

import logger from './app/utils/logger';
import connect from './app/utils/db'; 

const app = express();
const port = process.env.PORT || 4999;
const webPass = process.env.WEBPASS || ['*'];

// Connect the db
connect();

// Use CORS
app.use(cors({
    allowedOrigins: [webPass]
}));

// Log Incoming requests
app.all('*', (req, res) => {
    logger.info(`Incoming request: ${req.method}`);
    return next();
});

app.listen(port, () => {
    logger.info(`The API is running at port ${port}`);
});