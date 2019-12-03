import express from "express";
import bodyParser from "body-parser";

import mysql from "./mysql";
import { initRouter } from "../routes";

export default class Server {
  constructor() {
    this.server = express();
    this.server.set("port", 3000);
    this.server.set("hostname", "localhost");
  }

  init() {
    // set all the server things
    // this.server.set("env", config.env);
    // this.server.set("port", config.port);
    // this.server.set("hostname", config.hostname);

    // add middleware to parse the json
    this.server.use(bodyParser.json());
    this.server.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    mysql.connect(function(err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
      console.log("connected as id " + mysql.threadId);
    });

    // Set up routes
    initRouter(this.server);
  }

  start() {
    const hostname = this.server.get("hostname");
    const port = this.server.get("port");

    this.server.listen(port, function() {
      console.log(
        "Express server listening on - http://" + hostname + ":" + port
      );
    });
  }
}
