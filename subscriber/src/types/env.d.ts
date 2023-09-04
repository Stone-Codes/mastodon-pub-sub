declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RABBITMQ_URL: string;
      RABBITMQ_USER: string;
      RABBITMQ_PASSWORD: string;
      RABBITMQ_EXCHANGE_NAME: string;
      RABBITMQ_QUEUE_NAME: string;
    }
  }
}

export {};
