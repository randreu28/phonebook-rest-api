import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";
import morgan from "morgan";
import handlePersons from "./persons";
import handleGetInfo from "./info";
import { dbConnect } from "./db";

const app = express();

morgan.token("body", (req: Request, _res: Response) => {
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

dbConnect(app);
handleGetInfo(app);
handlePersons(app);
