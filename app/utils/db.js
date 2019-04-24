import mongoose from 'mongoose';

import logger from './logger';
import config from '../config';

const connect = () => {
    mongoose.connect(config.MONGODB, {useNewUrlParser: true}, err => {
        if (err){
            logger.error(`Can not connected to the database at ${config.MONGODB}`);
            return false;
        }
        logger.info(`Connected to mongodb database at ${config.MONGODB}`);
    });
    return true;
}

export default connect;