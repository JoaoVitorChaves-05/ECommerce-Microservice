import amqp from 'amqplib/callback_api'

class Producer {
    sendMessage(queue, order) {
        amqp.connect('amqp://localhost', (error0, connection) => {
            if (error0)
                throw error0

            connection.createChannel((error1, channel) => {
                if (error1)
                    throw error1

                const message = JSON.stringify(order)

                channel.assertQueue(queue, {
                    durable: true,
                })

                channel.sendToQueue(queue, Buffer.from(message), {
                    persistent: true,
                })

                console.log(" [X] Sent %s", message)
            })

            setTimeout(() => {
                connection.close()
            }, 500)
        })
    }
}

export default new Producer()