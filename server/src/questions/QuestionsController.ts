import { Router } from "express";
import Controller from "../Controller";
import { getQuestions } from "../messages/MessagesService";

class QuestionsController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get("/", getQuestions);

    return this._router;
  }
}

export default QuestionsController;
