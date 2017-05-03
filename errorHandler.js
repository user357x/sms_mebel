'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: 'error' }),
        new (winston.transports.File)({
            filename: 'error.log',
            level: 'error'
        })
    ]
});

module.exports = (err) => {
    console.error(err.stack)
    logger.log('error', err.stack);
};