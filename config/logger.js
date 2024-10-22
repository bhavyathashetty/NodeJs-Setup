import winston from 'winston';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');

const logger = winston.createLogger({
    level: 'info', 
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() 
    ),
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }), 
        new winston.transports.File({ filename: path.join(logsDir, 'combined.log') }) 
    ]
});


import fs from 'fs';

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

export default logger;
