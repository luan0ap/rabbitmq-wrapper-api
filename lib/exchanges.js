const request = require('./request')

/**
 * A exchanges can manage exchanges
 * @module exchanges
 */
function exchanges (config) {
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
          * Get the exchange
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request
          */
        get (params = {}) {
          return rp('GET', `/exchanges/${vhost}/${name}`, params)
        },

        /**
          * Remove the exchange
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request
          */
        remove (params = {}) {
          return rp('DELETE', `/exchanges/${vhost}/${name}`, params)
        },

        /**
          * Update the exchange
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [data] - body request
          * @return {Promise} - the Promise for the http request
          */
        update (data) {
          return rp('PUT', `/exchanges/${vhost}/${name}`, data)
        },

        /**
          * List bindings source from the exchange
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request
          */
        listBindingsSource (params = {}) {
          return rp('GET', `/exchanges/${vhost}/${name}/bindings/source`, params)
        },

        /**
          * List bindings destination from the exchange
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - axios params
          * @return {Promise} - the Promise for the http request]
          */
        listBindingsDestination (params = {}) {
          return rp('GET', `/exchanges/${vhost}/${name}/bindings/destination`, params)
        },

        /**
          * Publish a message to the exchange
          * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
          * @param {Object} [params] - body request
          * @return {Promise} - the Promise for the http request
          */
        publish (data) {
          return rp('POST', `/exchanges/${vhost}/${name}/publish`, data)
        }
      }
    },

    /**
      * List all exchanges
      * @see https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.10/deps/rabbitmq_management/priv/www/api/index.html
      * @param {Object} [params] - axios params
      * @return {Promise} - the Promise for the http request
      */
    list (params = {}) {
      return rp('GET', `/exchanges/${vhost}`, params)
    }

  }
}

module.exports = exchanges
