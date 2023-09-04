import "dotenv/config";

import RabbitMQ from "./RabbitMQ.ts";
import Mastodon from "./Mastodon.ts";
import { mastodon } from "masto";
import ExpressServer from "./ExpressServer.ts";

const main = async () => {
  // Setup rabbitmq connection and queue
  const rabbitmq = new RabbitMQ();
  await rabbitmq.connectQueue();

  // setup mastodon api and streaming handling
  const mastodon = new Mastodon();
  const handleMessage = (msg: string, media: mastodon.v1.MediaAttachment[]) => {
    const message = {
      msg,
      media,
    };
    rabbitmq.publishMessage(JSON.stringify(message));
  };
  mastodon.streamUser(handleMessage);

  // start express server
  new ExpressServer(mastodon);
};

main();
