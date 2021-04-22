import express from "express";

import "./database"; // establishes connection to the database
import { routes } from "./routes";

const app = express();

// Import global middlewares
app.use(express.json());

// Import routes
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});