import path from 'path';
import fs from 'fs';
import { createLogger, format, transports } from 'winston';
import winston from 'winston';

import config from '../config';

const logDir = 'log';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}  

const env = config.NODE_ENV;
const filename = path.join(logDir, 'logging.log');

const logger = createLogger({
    levels: winston.config.syslog.levels,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
        level: config.LOG_LEVEL,
        format: format.combine(
            format.colorize(),
            format.printf(
                info => `${info.timestamp} ${info.level}: ${info.message}`
            )
        )
        }),
        new transports.File({ filename })
    ]
});

export default logger;