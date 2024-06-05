import amqp from 'amqplib'

class Producer {

    async sendMessage(queue, order) {
        const connection = await amqp.connect('amqp://localhost')
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);

        try {
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), {
                persistent: true
            })
            console.log(`Message sent to ${queue}: ${JSON.stringify(order)}`)
        } catch (error) {
            console.error(`Error sending message to ${queue}: ${error.message}`)
        } finally {
            channel.close()
        }
    }
}

export default new Producer()
