import amqp from "amqplib/callback_api";

class Consumer {
  async consumeMessages(queue) {
    return new Promise((resolve, reject) => {
      amqp.connect("amqp://localhost", (error0, connection) => {
        if (error0) {
          return reject(error0)
        }

        connection.createChannel((error1, channel) => {
          if (error1) {
            return reject(error1)
          }

          channel.assertQueue(queue, {
            durable: true,
          })

          console.log(
            `[*] Waiting for messages in ${queue}. To exit press CTRL+C`
          )

          channel.consume(
            queue,
            (message) => {
              if (message != null) {
                const order = JSON.parse(message.content.toString())
                channel.ack(message)
                console.log(" [x] Received %s", order)
                resolve(order)

                connection.close()
              }
            },
            {
              noAck: false,
            }
          )
        })
      })
    })
  }
}

export default new Consumer()
