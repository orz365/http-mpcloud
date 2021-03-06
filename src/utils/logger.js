var log4js = require('log4js');
var logger = log4js.getLogger();

logger.level = 'debug'

log4js.configure({
    appenders: {
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: logger.level
        }
    }
});


module.exports = logger;