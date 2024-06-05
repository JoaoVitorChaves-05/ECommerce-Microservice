import amqp from "amqplib"

import PostOneOrder from "../../domain/use_cases/order/PostOne.js"
import UpdateOneOrder from "../../domain/use_cases/order/UpdateOne.js"
import DeleteOneOrder from "../../domain/use_cases/order/DeleteOne.js"

import dotenv from "dotenv"

dotenv.config()

const selectUseCase = async (message, queue) => {
  const useCases = {
    'order_created': async () => {
      await PostOneOrder.execute(message.customerId, message.orderItems, message.totalPrice, 'completed')
    },
    'order_updated': async () => {
      await UpdateOneOrder.execute(message.orderId, message.orderItems, message.totalPrice)
    },
    'order_deleted': async () => {
      await DeleteOneOrder.execute(message.orderId)
    }
  }

  await useCases[queue]()
}

class Consumer {
  async create(callback) {
    const connection = await amqp.connect('amqp://localhost')
    const queues = ['order_created', 'order_updated', 'order_deleted']
    queues.forEach(async (queue) => {
      const channel = await connection.createChannel()
      await channel.assertQueue(queue)

      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const message = JSON.parse(msg.content.toString())
          channel.ack(msg)
          callback(message, queue)
          console.log(`Message received in ${queue}: ${message}`)
        } else {
          console.log('Consumer cancelled by server')
        }
      }),

      console.log(`Waiting message in ${queue}`)
    })
  }
}

const consumer = new Consumer()

export { consumer, selectUseCase }