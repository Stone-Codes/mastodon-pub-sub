import "dotenv/config";
import { RabbitMQ } from "./RabbitMQ";

const rabbitmq = new RabbitMQ();

const main = async () => {
  await rabbitmq.connectQueue();
  await rabbitmq.listenQueue();
};

main();
