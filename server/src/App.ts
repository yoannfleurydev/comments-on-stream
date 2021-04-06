import express from "express";
import MessagesController from "./messages/MessagesController";
import QuestionsController from "./questions/QuestionsController";
import InfoController from "./info/InfoController";
import cors from "cors";

class App {
  public express;

  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(express.json());
    this.mountRoutes();
  }

  private mountRoutes() {
    const messagesController = new MessagesController();
    const questionsController = new QuestionsController();
    const infoController = new InfoController();

    this.express.use("/api/messages", messagesController.routes());
    this.express.use("/api/questions", questionsController.routes());
    this.express.use("/api/info", infoController.routes());
  }
}

export default new App().express;
