import express from "express";
import { join } from "path";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import "./database"; // establishes connection to the database
import { routes } from "./routes";

const app = express();

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
  console.log("Websocket connected", socket.id);
});

// Import global middlewares
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));
app.set("views", join(__dirname, "../public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Import routes
app.use(routes);

// test webpage rendering route to start socket connection
app.get("/pages/client", (req, res) => {
  return res.render("html/client.html");
})

export { http, io };