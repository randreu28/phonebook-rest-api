import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (_req: Request, res: Response) => {
  res.send(persons);
});

app.get("/info", (_req: Request, res: Response) => {
  res.send(`
  <p>Phone book has info for ${persons.length}<p/>
  <p>${new Date().toString()}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
