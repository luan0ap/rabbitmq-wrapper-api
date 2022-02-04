const request = require('./request')

/**
 * A queues can get info about queues on rabbitmq
 * @module queues
 */
function queues (config) {
  const rp = request(config)

  const { vhost } = config

  return {
    /**
     * Manage a single queue
     * @param {string} name - the queue name
     * @returns {Object<methods>}
     */
    name (name) {
      return {
        /**
          * Fetch the queue
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request
          */
        get (params = {}) {
          return rp('GET', `/queues/${vhost}/${name}`, params)
        },

        /**
          * Remove the queue
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request
          */
        remove (params = {}) {
          return rp('DELETE', `/queues/${vhost}/${name}`, params)
        },

        /**
          * Update the queue
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [data] - request body
          * @return {Promise} - the Promise for the http request
          */
        update (data) {
          return rp('PUT', `/queues/${vhost}/${name}`, data)
        },

        /**
          * List all bindings from the queue
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request
          */
        listBindings (params = {}) {
          return rp('GET', `/queues/${vhost}/${name}/bindings`, params)
        },

        /**
          * Purge all messages from the queue
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request
          */
        purgeContent (params = {}) {
          return rp('DELETE', `/queues/${vhost}/${name}/contents`, params)
        },

        /**
          * Add an action to the queue
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [data] - request body
          * @return {Promise} - the Promise for the http request
          */
        addAction (data) {
          return rp('POST', `/queues/${vhost}/${name}/actions`, data)
        },

        /**
          * List all messages from the queue
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [data] - request body
          * @return {Promise} - the Promise for the http request
          */
        listMessages (data) {
          return rp('POST', `/queues/${vhost}/${name}/get`, data)
        },

        /**
          * Move all messages from the queue to another queuer
          * @see https://www.rabbitmq.com/shovel-dynamic.html
          * @param {String} [dest] - destination queue
          * @return {Promise} - the Promise for the http request
          */
        moveMessagesTo (dest) {
          if (typeof dest !== 'string' && !dest) {
            return Promise.reject(new TypeError('dest must be a string and can not be empty'))
          }

          const shovelName = `Move from ${name}`

          const data = {
            value: {
              'src-uri': 'amqp://',
              'src-queue': name,
              'src-protocol': 'amqp091',
              'src-delete-after': 'queue-length',
              'dest-protocol': 'amqp091',
              'dest-uri': 'amqp://',
              'dest-queue': dest
            }
          }

          return rp('PUT', `/parameters/shovel/${vhost}/${encodeURIComponent(shovelName)}`, data)
        }
      }
    },

    /**
      * List all queues
      * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
      * @param {Object} [params] - axios params
      * @return {Promise} - the Promise for the http request
      */
    list (params) {
      return rp('GET', `/queues/${vhost}`, params)
    }

  }
}

module.exports = queues
