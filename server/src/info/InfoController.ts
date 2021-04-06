import { Router } from "express";
import Controller from "../Controller";
import { getChannel } from "./InfoService";

class InfoController implements Controller {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  routes(): Router {
    this._router.get("/channel", getChannel);

    return this._router;
  }
}

export default InfoController;
