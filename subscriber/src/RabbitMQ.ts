import amqplib from "amqplib";
export class RabbitMQ {
  private channel?: amqplib.Channel;
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
      process.env.RABBITMQ_EXCHANGE_NAME!,
      "fanout"
    );
  }

  async listenQueue() {
    if (!this.channel) {
      throw new Error("No connection setup with rabbitmq");
    }
    const { queue } = await this.channel.assertQueue(
      process.env.RABBITMQ_QUEUE_NAME!,
      {
        exclusive: true,
      }
    );

    this.channel.bindQueue(queue, process.env.RABBITMQ_EXCHANGE_NAME!, "");

    this.channel.consume(queue, (msg) => {
      if (msg) {
        if (msg.content)
          console.log(
            `Message in queue ${process.env.RABBITMQ_QUEUE_NAME}: `,
            msg.content.toString()
          );
        this.channel.ack(msg);
      }
    });
  }
}
