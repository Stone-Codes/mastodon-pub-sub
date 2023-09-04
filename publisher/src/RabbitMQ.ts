import amqplib from "amqplib";

class RabbitMQ {
  private channel: amqplib.Channel;
  constructor() {}

  async connectQueue() {
    const credentials = amqplib.credentials.plain(
      process.env.RABBITMQ_USER,
      process.env.RABBITMQ_PASSWORD
    );
    const connection = await amqplib.connect(process.env.RABBITMQ_URL, {
      credentials,
    });

    this.channel = await connection.createChannel();
    await this.channel.assertExchange(
      process.env.RABBITMQ_EXCHANGE_NAME,
      "fanout"
    );
  }

  async publishMessage(msg: string) {
    this.channel.publish(
      process.env.RABBITMQ_EXCHANGE_NAME,
      "",
      Buffer.from(msg)
    );
  }
}

export default RabbitMQ
