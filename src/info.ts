import type { Request, Response } from "express";
import express from "express";
import { Person } from "./db";

export default function handleGetInfo(app: express.Express) {
  app.get("/info", (_req: Request, res: Response) => {
    Person.find({}).then((persons) => {
      res.send(`
        <p>Phone book has info for ${persons.length}<p/>
        <p>${new Date().toString()}</p>
    `);
    });
  });
}
