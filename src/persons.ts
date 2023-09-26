import express from "express";
import type { Request, Response } from "express";
import { persons } from ".";
import { z } from "zod";

export default function handlePersons(app: express.Express) {
  handleGetPersons(app);
  handleGetPersonById(app);
  handleDeletePerson(app);
  handlePostPerson(app);
}

export function handleGetPersons(app: express.Express) {
  app.get("/api/persons", (_req: Request, res: Response) => {
    res.send(persons);
  });
}

export function handlePostPerson(app: express.Express) {
  app.post("/api/persons", (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    const personSchema = z.object({
      name: z.string(),
      number: z.string(),
    });
    const { success } = personSchema.safeParse(data);
    if (!success) {
      res.status(400).json({ error: "invalid body" }).end();
      return;
    }
    const parsedData = data as z.infer<typeof personSchema>;
    const isNameRegistered = persons.some(
      (person) => person.name === parsedData.name
    );
    if (isNameRegistered) {
      res.status(400).json({ error: "Name must be unique" }).end();
      return;
    }
    persons.push({ ...parsedData, id: Math.floor(Math.random() * 999999) });
    res.send(persons);
  });
}

export function handleDeletePerson(app: express.Express) {
  app.delete("/api/persons/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    res.send(persons.filter((person) => person.id !== id));
  });
}

export function handleGetPersonById(app: express.Express) {
  app.get("/api/persons/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    res.send(persons.find((person) => person.id === id));
  });
}
