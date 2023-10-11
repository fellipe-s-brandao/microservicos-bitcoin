import { config } from "dotenv";
import { Channel, connect } from "amqplib";

export const createMessageChannel = async (): Promise<Channel> => {
    config()
    try {
        const connection = await connect(process.env.AMQP_SERVER)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.QUEUE_NAME)

        console.log("RabbitMQ conectado");
        return channel

    } catch (error) {
        console.error("Erro ao conectar ao RabbitMQ")
        console.error(error)
        return null
    }
}