import { Router } from "express";
import Controller from "../Controller";
import {
  getQuestions,
  postQuestion,
  getLiveQuestion,
  updateQuestion,
} from "../messages/MessagesService";

class QuestionsController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get("/", getQuestions);
    this._router.post("/", postQuestion);
    this._router.put("/:id", updateQuestion);

    this._router.get("/live", getLiveQuestion);

    return this._router;
  }
}

export default QuestionsController;
