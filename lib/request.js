const axios = require('axios').default

/**
  * Parse auth object to base64 Basic Authorization
  * @private
  * @param {{ username: string, password: string }} [auth] - authentication object
  * @returns {String} - encoded base64 username and password
 */
const _getAuthorizationHeader = (auth) =>
  typeof auth === 'object' ? 'Basic ' + Buffer.from(`${auth.username}:${auth.password}`).toString('base64') : ''

/**
  * Compute the headers required for an API request.
  * @private
  * @param {{ username: string, password: string }} [auth] - authentication object
  * @return {Object} - the headers to use in the request
  */
const _getRequestHeaders = (auth) => {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: _getAuthorizationHeader(auth)
  }

  return headers
}

/**
 * Request main function
 * @param {Object} param0
 * @returns {Promise}
 */
function request ({ hostname, port, username, password }) {
  /**
  * Make a request.
  * @param {string} [method] - the method for the request (GET, PUT, POST, DELETE)
  * @param {string} [path] - the path for the request
  * @param {*} [data] - the data to send to the server. For HTTP methods that don't have a body the data
  *                     will be sent as query parameters
  * @return {Promise} - the Promise for the http request
  */
  return function (method = 'GET', path, data) {
    const config = {
      baseURL: _getURL(hostname, port),
      method,
      url: path,
      headers: _getRequestHeaders({ username, password })
    }

    const shouldUseDataAsParams = data && (typeof data === 'object') && _methodHasNoBody(method)
    if (shouldUseDataAsParams) {
      config.params = data
      data = undefined
    }

    if (data) {
      config.data = data
    }

    const requestPromise = axios(config)

    return requestPromise
  }
}

module.exports = request

// ////////////////////////// //
//  Private helper functions  //
// ////////////////////////// //
const METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE']
const _methodHasNoBody = method => METHODS_WITH_NO_BODY.indexOf(method) !== -1

const _prependHttp = (url, { https = false } = {}) => {
  if (typeof url !== 'string') {
    throw new TypeError('url must be a string')
  }

  url = url.trim()

  if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
    return url
  }

  return url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? 'https://' : 'http://')
}

const _getURL = (hostname, port) => {
  const baseURL = new URL(_prependHttp(hostname))
  baseURL.pathname = '/api'
  baseURL.port = port

  return baseURL.toString()
}
