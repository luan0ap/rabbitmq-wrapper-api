# RabbitMQ-wrapper-API

`RabbitMQ.js` provides a minimal higher-level wrapper around rabbitmq's API.

## Usage

```javascript
/*
  Data retrieved from API will return a raw axios response
*/
const RabbitMQ = require('rabbitmq-wrapper-api');

const { queues, exchanges } = RabbitMQ({
  hostname: 'http://localhost',
  username: 'guest',
  password: 'guest',
  vhost: '/'
})

queues.list()
  .then((data) => {
    // do some stuff
  })

exchanges.name('exchange-name').get({}) // allowed axios params
  .then((data) => {
    // do some stuff
  })
```

## API Documentation

The documentation is generated from JSDoc

You could check the docs for each function using
```shell
yarn make-docs

npm run make-docs
```

## Installation
`RabbitMQ.js` is available from `npm` or `yarn`.

```shell
npm install rabbitmq-wrapper-api
```

```shell
yarn add rabbitmq-wrapper-api
```

### Tests

The main way we write code for `rabbitmq-api` is using test-driven development. We use Jest to run our tests. Given that the bulk of this library is just interacting with RabbitMQ's API, nearly all of our tests are integration tests. 

To run the test suite, run `npm run test`.