import amqp from "amqplib"

import PostOneOrder from "../../domain/use_cases/order/PostOne.js"
import UpdateOneOrder from "../../domain/use_cases/order/UpdateOne.js"
import DeleteOneOrder from "../../domain/use_cases/order/DeleteOne.js"

import PostOneProduct from "../../domain/use_cases/product/PostOne.js"
import UpdateNameProduct from "../../domain/use_cases/product/UpdateName.js"
import DeleteOneProduct from "../../domain/use_cases/product/DeleteOne.js"
import AddUnitProduct from "../../domain/use_cases/product/AddUnit.js"
import RemoveUnitProduct from "../../domain/use_cases/product/RemoveUnit.js"

import PostOneCustomer from "../../domain/use_cases/customer/PostOne.js"
import UpdateOneCustomer from "../../domain/use_cases/customer/UpdateOne.js"
import DeleteOneCustomer from "../../domain/use_cases/customer/DeleteOne.js"

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
    },
    'product_created': async () => {
      await PostOneProduct.execute(message.productName, message.pricePerUnit, message.units)
    },
    'product_updated': async () => {
      await UpdateNameProduct.execute(message.productId, message.productName)
    },
    'product_added': async () => {
      await AddUnitProduct.execute(message.productId, message.units)
    },
    'product_removed': async () => {
      await RemoveUnitProduct.execute(message.productId, message.units)
    },
    'product_deleted': async () => {
      await DeleteOneProduct.execute(message.productId)
    },
    'customer_added': async () => {
      await PostOneCustomer.execute(message.name, message.email, message.password)
    },
    'customer_updated': async () => {
      await UpdateOneCustomer.execute(message.email, message.password, message.newData)
    },
    'customer_deleted': async () => {
      await DeleteOneCustomer.execute(message.email, message.password)
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