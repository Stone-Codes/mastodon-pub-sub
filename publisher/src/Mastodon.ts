import { createRestAPIClient, createStreamingAPIClient, mastodon } from "masto";

class Mastodon {
  private mastodonClient: mastodon.rest.Client;
  private mastodonStreamingClient: mastodon.streaming.Client;

  constructor() {
    this.mastodonClient = createRestAPIClient({
      url: process.env.MASTODON_URL,
      accessToken: process.env.MASTODON_ACCESS_TOKEN,
    });
    this.mastodonStreamingClient = createStreamingAPIClient({
      streamingApiUrl: process.env.MASTODON_STREAMING_URL,
      accessToken: process.env.MASTODON_ACCESS_TOKEN,
    });
  }

  async postStatus(msg: string, media?: Express.Multer.File) {
    let mediaId: string;
    if (media) {
      try {
        const uploadedMedia = await this.mastodonClient.v2.media.create({
          file: new Blob([media.buffer]),
        });
        mediaId = uploadedMedia.id;
      } catch (e) {
        // Shortcuts:
        // Proper logging / error handling missing
        console.log(e);
        return e;
      }
    }
    try {
      this.mastodonClient.v1.media.create;
      await this.mastodonClient.v1.statuses.create({
        status: msg,
        visibility: "private", // Private to just handle it in internal system instead of seeing it on the social media platform
        mediaIds: [mediaId],
      });
    } catch (e) {
      // Shortcuts:
      // Proper logging / error handling missing
      console.log(e);
      return e;
    }
  }

  async streamUser(
    callback: (msg: string, attachments: mastodon.v1.MediaAttachment[]) => void
  ) {
    const subscription = this.mastodonStreamingClient.user.subscribe();
    console.log("Streaming user events");
    for await (const event of subscription) {
      // Filter out just new status
      if (event.event === "update") {
        callback(event.payload.content, event.payload.mediaAttachments);
      }
    }
  }
}

export default Mastodon;
