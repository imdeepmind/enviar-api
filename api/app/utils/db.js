import mongoose from 'mongoose';
import logger from './logger';

const mongoUrl = process.env.MONGO || 'mongodb://localhost:27017/enviar';

const connect = () => {
    mongoose.connect(mongoUrl, {useNewUrlParser: true}, err => {
        if (err){
            logger.error(`Can not connected to the database at ${mongoUrl}`);
            return false;
        }
        logger.info(`Connected to mongodb database at ${mongoUrl}`);
    });

    return true;
}

export default connect;