import httpStatus from 'http-status';
import config from '../config/config.js';
import logger from '../config/logger.js';
import ApiError from '../utils/api_error.js';

export const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        error: true,
        code: statusCode,
        message,
        ...(config.env === 'development' && { stack: err.stack }),
    };

    if (config.env === 'development') {
        logger.error(
            `message:${message} - status:${statusCode} - url:${req.originalUrl} - ${req.body} - method:${req.method} - ${req.ip}`
        );
    }

    res.status(statusCode).send(response);
};

