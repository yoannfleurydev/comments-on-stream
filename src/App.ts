import express from "express";
import MessagesController from "./messages/MessagesController";
import cors from "cors";

class App {
  public express;

  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(express.json());
    this.mountRoutes();
  }

  private mountRoutes(): void {
    let messagesController = new MessagesController();

    this.express.use("/api/messages", messagesController.routes());
  }
}

export default new App().express;
