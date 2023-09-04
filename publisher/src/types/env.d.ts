declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MASTODON_URL?: string,
      MASTODON_STREAMING_URL?: string,
      MASTODON_ACCESS_TOKEN?: string,
      RABBITMQ_URL?: string,
      RABBITMQ_USER?: string,
      RABBITMQ_PASSWORD?: string
      RABBITMQ_EXCHANGE_NAME?: string
    }
  }
}

export { }
