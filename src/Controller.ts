import { Router } from "express";

interface Controller {
  _router: Router;

  routes(): void;
}

export default Controller;
