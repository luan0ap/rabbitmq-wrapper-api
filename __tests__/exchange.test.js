const RabbitMQAPI = require('../lib/rabbitmq')
const { getTypeOf } = require('./utils')

/* eslint-disable no-undef */

describe('Exchanges', () => {
  let rabbitmq
  const EXCHANGE_NAME = ''

  beforeAll(() => {
    rabbitmq = RabbitMQAPI({
      username: 'guest',
      password: 'guest',
      hostname: 'http://turbina',
      port: '15672'
    })
  })

  describe('Getting', () => {
    it('Should get a queue list', async () => {
      try {
        const data = await rabbitmq.exchanges.list()
        expect(data).toBeTruthy()
        expect(getTypeOf(data)).toBe('object')
        expect(data).toBeInstanceOf(Object)
      } catch (e) {
        console.error(e)
      }
    })

    it('Should get a queue', async () => {
      try {
        const data = await rabbitmq.exchanges.name(EXCHANGE_NAME).get()
        expect(data).toBeTruthy()
        expect(getTypeOf(data)).toBe('object')
        expect(data).toBeInstanceOf(Object)
      } catch (e) {
        console.error(e)
      }
    })
  })
})
