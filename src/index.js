const serverless = require('serverless-http')
const { init } = require('./init')

/**
 * Init database
 */
init()

/**
 * Init routes
 */
module.exports.handler = serverless(require('./api'))
