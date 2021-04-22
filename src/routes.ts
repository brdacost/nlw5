import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

// initialize the controllers
const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes
  .post("/settings", settingsController.create)
  .post("/user", usersController.create)
  .post("/message", messagesController.create)
  .get("/messages/:id", messagesController.showByUser)

export { routes };