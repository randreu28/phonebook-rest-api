import express from "express";
import type { Request, Response } from "express";
import { persons } from ".";

export default function handleGetInfo(app: express.Express) {
  app.get("/info", (_req: Request, res: Response) => {
    res.send(`
    <p>Phone book has info for ${persons.length}<p/>
    <p>${new Date().toString()}</p>
    `);
  });
}
