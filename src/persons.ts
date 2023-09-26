import express from "express";
import type { Request, Response } from "express";
import { z } from "zod";
import { Person } from "./db";

export default function handlePersons(app: express.Express) {
  handleGetPersons(app);
  handleGetPersonById(app);
  handleDeletePerson(app);
  handlePostPerson(app);
}

export function handleGetPersons(app: express.Express) {
  app.get("/api/persons", (_req: Request, res: Response) => {
    Person.find({}).then((persons) => {
      res.send(persons);
    });
  });
}

export function handlePostPerson(app: express.Express) {
  app.post("/api/persons", (req: Request, res: Response) => {
    const data = req.body;
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

    Person.findOne({ name: parsedData.name }).then((person) => {
      if (person !== null) {
        res.status(400).json({ error: "Name must be unique" }).end();
        return;
      }
      const newPerson = new Person({
        ...parsedData,
        id: Math.floor(Math.random() * 999999),
      });
      newPerson.save().then((person) => {
        res.send(person);
      });
    });
  });
}

export function handleDeletePerson(app: express.Express) {
  app.delete("/api/persons/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    Person.findOneAndRemove({ id: id })
      .then(() => {
        res.status(200).send({ message: "Person deleted successfully" });
      })
      .catch((err: Error) => {
        res.status(500).send(err);
      });
  });
}

export function handleGetPersonById(app: express.Express) {
  app.get("/api/persons/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    Person.findOne({ id: id })
      .then((person) => {
        res.send(person);
      })
      .catch((err: Error) => {
        res.status(500).send(err);
      });
  });
}
