import { Router } from "express";
import Controller from "../Controller";
import {
  getMessage,
  getMessages,
  deleteMessages,
  updateMessage,
} from "./MessagesService";

class MessagesController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get("/", getMessages);
    this._router.get("/:id", getMessage);
    this._router.delete("/", deleteMessages);
    this._router.put("/:id", updateMessage);

    return this._router;
  }
}

export default MessagesController;
