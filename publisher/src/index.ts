import "dotenv/config";

import { RabbitMQ } from "./RabbitMQ.js";
import { Mastodon } from "./Mastodon.js";
import { mastodon } from "masto";
import ExpressServer from "./ExpressServer.js";

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

// start/setup express server for receiving messages
new ExpressServer(mastodon);
