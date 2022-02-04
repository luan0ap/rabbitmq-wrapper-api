const RabbitMQAPI = require('../lib/rabbitmq')
const { getTypeOf } = require('./utils')

/* eslint-disable no-undef */

describe('Queues', () => {
  let rabbitmq
  const QUEUE_NAME = ''

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
        const data = await rabbitmq.queues.list()
        expect(data).toBeTruthy()
        expect(getTypeOf(data)).toBe('object')
        expect(data).toBeInstanceOf(Object)
      } catch (e) {
        console.error(e)
      }
    })

    it('Should get a queue', async () => {
      try {
        const data = await rabbitmq.queues.name(QUEUE_NAME).get()
        expect(data).toBeTruthy()
        expect(getTypeOf(data)).toBe('object')
        expect(data).toBeInstanceOf(Object)
      } catch (e) {
        console.error(e)
      }
    })
  })

  describe('Moving', () => {
    it('Should move messages between queues', async () => {
      try {
        const queueFrom = ''
        const queueTo = ''

        const data = await rabbitmq.queues.name(queueFrom).moveMessagesTo(queueTo)
        expect(data.status).toBe(201)
      } catch (e) {
        console.log(e)
      }
    })
  })
})
