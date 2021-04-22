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
  // Settings routes
  .post("/settings", settingsController.create)
  .get("/settings/:username", settingsController.findByUsername)
  .put("/settings/:username", settingsController.update)
  // User routes
  .post("/user", usersController.create)
  // Message routes
  .post("/message", messagesController.create)
  .get("/messages/:id", messagesController.showByUser)

export { routes };