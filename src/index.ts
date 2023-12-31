import cors from "cors";
import dotenv from "dotenv";
import type { Request } from "express";
import express from "express";
import morgan from "morgan";
import { dbConnect } from "./db";
import { errorHandler } from "./errorHandler";
import handleGetInfo from "./info";
import handlePersons from "./persons";

const app = express();

morgan.token("body", (req: Request) => {
  return JSON.stringify(req.body);
});
dotenv.config();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(morgan("tiny"));
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(errorHandler);

dbConnect(app);
handleGetInfo(app);
handlePersons(app);
