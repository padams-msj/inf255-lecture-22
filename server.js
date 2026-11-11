import express from "express";
import { DatabaseSync } from "node:sqlite";

const app = express();
const port = 3000;
const db = new DatabaseSync("shelter.db");

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.method, req.url);
  res.send("Hello from the server!");
});

app.get("/api/animals", (req, res) => {
  const animals = db.prepare("SELECT * FROM animals").all();
  res.json(animals);
});

app.get("/api/animals/:id", (req, res) => {
  const id = Number(req.params.id);
  const animal = db.prepare("SELECT * FROM animals WHERE id = ?").get(id);
  if (!animal) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }
  res.json(animal);
});

app.post("/api/animals", (req, res) => {
  const name = req.body.name;
  const species = req.body.species;
  const age = req.body.age;
  const adopted = req.body.adopted;

  if (!name || name.trim() === "") {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const allSpecies = ["Dog", "Cat", "Rabbit", "Guinea pig"];
  if (!allSpecies.includes(species)) {
    res.status(400).json({ error: "Species must be Dog, Cat, Rabbit, or Guinea pig" });
    return;
  }

  if (!Number.isInteger(age) || age < 0) {
    res.status(400).json({ error: "Age must be a whole number, 0 or more" });
    return;
  }

  db.prepare(
    "INSERT INTO animals (name, species, age, adopted) VALUES (?, ?, ?, ?)"
  ).run(name, species, age, adopted ? 1 : 0);

  res.status(201).json({ message: "Added " + name + "." });
});

app.get("/api/shelter", (req, res) => {
  const shelter = {
    name: "Happy Paws Shelter",
    city: "Cincinnati",
    phone: "513-555-0142",
  };
  res.json(shelter);
});

app.get("/api/available", (req, res) => {
  const animals = db
    .prepare("SELECT * FROM animals WHERE adopted = 0")
    .all();
  res.json(animals);
});

app.get("/api/stats", (req, res) => {
  const total = db
    .prepare("SELECT COUNT(*) AS count FROM animals")
    .get().count;
  const adopted = db
    .prepare("SELECT COUNT(*) AS count FROM animals WHERE adopted = 1")
    .get().count;
  res.json({ total, adopted });
});

app.get("/api/species/:species", (req, res) => {
  const animals = db
    .prepare("SELECT * FROM animals WHERE lower(species) = lower(?)")
    .all(req.params.species);
  res.json(animals);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
