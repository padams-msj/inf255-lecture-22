import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("shelter.db");

const schema = readFileSync("schema.sql", "utf8");
db.exec(schema);

const insert = db.prepare(
  "INSERT INTO animals (name, species, age, adopted) VALUES (?, ?, ?, ?)"
);

insert.run("Biscuit", "Dog", 3, 0);
insert.run("Pickles", "Cat", 5, 1);
insert.run("Waffles", "Rabbit", 1, 0);
insert.run("Noodle", "Dog", 2, 0);
insert.run("Mochi", "Cat", 7, 0);
insert.run("Pepper", "Guinea pig", 2, 1);

console.log("Seeded shelter.db with 6 animals.");
