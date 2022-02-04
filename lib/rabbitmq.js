const queues = require('./queues')
const exchanges = require('./exchanges')

/**
  * RabbitMQ initialization config
  * @typedef {Object} RabbitMQ.instanceConfig
  * @prop {string} [hostname] - the RabbitMQ host
  * @prop {string} [username] - the RabbitMQ username
  * @prop {string} [password] - the user's password
  * @prop {string|number} [port] - the RabbitMQ port
  * @prop {string} [vhost] - the RabbitMQ vhost if necessary
  */
/**
 * Instance all others modules
 * @param {RabbitMQ.instanceConfig} param0 - config
 * @returns {Object} - the modules instances
 */
module.exports = function ({
  hostname = 'http://localhost',
  username = 'guest',
  password = 'guest',
  port = 15672,
  vhost = '/'
} = {
  hostname: 'http://localhost',
  username: 'guest',
  password: 'guest',
  port: 15672,
  vhost: '/'
}) {
  const config = {
    hostname,
    username,
    password,
    port,
    vhost: encodeURIComponent(vhost)
  }

  return {
    queues: {
      ...queues(config)
    },

    exchanges: {
      ...exchanges(config)
    }
  }
}
