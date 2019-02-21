import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import boom from 'boom';

import routes from './routes';

import { mongoUrl } from './config';
import { dbError } from './messages';

const app = express();

const PORT = process.env.PORT || 4999;

mongoose.connect(mongoUrl, {useNewUrlParser: true}, err => {
    if (err){
        return boom.serverUnavailable(dbError);
    }
});

app.use(cors({
    allowedOrigins: [
        '*'
    ]
}));

app.use(routes);

app.listen(PORT)

console.log(`The server is running using the port ${PORT}`);