import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "../utils/logger"

import conn from "../configs/mysql";
import { initRouter } from "../routes";

export default class Server {
  constructor() {
    this.server = express();
  }

  init() {
    this.server.set("host", process.env.HOST);
    this.server.set("port", process.env.PORT);

    this.server.use(bodyParser.json());
    this.server.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.server.use(cors());

    conn.connect(function (err) {
      if (err) {
        logger.error("error connecting: " + err.stack);
        return;
      }
      logger.info("connected as id " + conn.threadId);
    });

    // Initialize routes
    initRouter(this.server);
  }

  start() {
    const host = this.server.get("host");
    const port = this.server.get("port");

    this.server.listen(port, function () {
      logger.info("Express server listening on - http://" + host + ":" + port);
    });
  }
}
