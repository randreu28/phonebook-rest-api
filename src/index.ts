import express from "express";
import type { Request, Response } from "express";
import z from "zod";

const app = express();
app.use(express.json());
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

app.get("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  res.send(persons.find((person) => person.id === id));
});

app.delete("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  res.send(persons.filter((person) => person.id !== id));
});

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
