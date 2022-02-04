import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { itemsRouter } from "./router/items.router";

dotenv.config();

const port: number = parseInt(process.env.PORT as string, 10);

if (!port) {
  process.exit(1);
}

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo App Backend!");
});

app.use("/api/todos", itemsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
