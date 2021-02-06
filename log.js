
const log4js = require("log4js");
var config = require('./config');

log4js.configure({
    appenders: { cheese: { type: "file", filename: config.logFile } },
    categories: { default: { appenders: ["cheese"], level: config.logLevel } }
});

module.exports = log4js.getLogger("cheese");