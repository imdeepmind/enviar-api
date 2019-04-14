import path from 'path';
import fs from 'fs';
import { createLogger, format, transports } from 'winston';
const logDir = 'log';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}  

const env = process.env.NODE_ENV || 'development';
const filename = path.join(logDir, 'logging.log');

const logger = createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
        level: 'info',
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