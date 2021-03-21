import express from "express";
import MessagesController from "./messages/MessagesController";
import QuestionsController from "./questions/QuestionsController";
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
    let messagesController = new MessagesController();
    let questionsController = new QuestionsController();

    this.express.use("/api/messages", messagesController.routes());
    this.express.use("/api/questions", questionsController.routes());
  }
}

export default new App().express;
