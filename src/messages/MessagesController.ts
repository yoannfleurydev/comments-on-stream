import { Router } from "express";
import Controller from "../Controller";
import { getMessage, getMessages } from "./MessagesService";

class MessagesController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get("/", getMessages);
    this._router.get("/:id", getMessage);

    return this._router;
  }
}

export default MessagesController;
