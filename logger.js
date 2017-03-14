var winston = require('winston');
require('winston-daily-rotate-file');

var logger = new winston.Logger({
    transports: [
/*        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),*/
        new winston.transports.DailyRotateFile({
            filename: 'cesperance-backend.log.',
            datePattern: 'yyyy-MM-dd',
            prepend: false,
            level: 'info'
        })
    ],
    exitOnError: false
});

module.exports =  logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};