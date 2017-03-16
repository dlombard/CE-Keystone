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
        }),
         new winston.transports.DailyRotateFile({
      name: 'error-file',
      filename: 'cesperance-backend-error.log',
      level: 'error'
    }),
    ],
    exitOnError: false
});

module.exports =  logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};