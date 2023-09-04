import express from "express";
import Mastodon from "./Mastodon.ts";

import multer, { Multer } from "multer";

class ExpressServer {
  private app: express.Express;
  private mastodon: Mastodon;
  private upload: Multer;

  constructor(mastodon: Mastodon) {
    this.mastodon = mastodon;

    this.upload = multer({});

    this.app = express();
    this.registerRoutes();
    this.app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  }

  // Shortcuts:
  // No file validation (file size, file type, ...)
  // No body validation with something like zod (https://www.npmjs.com/package/zod)
  // No proper error handling for validation and if something goes wrong while posting status
  private registerRoutes() {
    this.app.post("/", this.upload.single("media"), async (req, res) => {
      try {
        await this.mastodon.postStatus(req.body.status, req.file);
      } catch (e) {
        console.log(e);
        return res.status(500).send({ error: "Something went wrong" });
      }
      res.send();
    });
  }
}

export default ExpressServer;
