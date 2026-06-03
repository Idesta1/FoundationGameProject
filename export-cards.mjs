import Database from "better-sqlite3";
import fs from "fs";

const db = new Database("./data/cards-data.sqlite");
const cards = db.prepare("SELECT * FROM cards").all();

// Group into packs
const packs = {};
for (const card of cards) {
  if (!packs[card.pack]) packs[card.pack] = [];
  packs[card.pack].push(card);
}

fs.writeFileSync("./data/cards.json", JSON.stringify({ packs }, null, 2));
console.log(
  "Exported",
  cards.length,
  "cards across",
  Object.keys(packs).length,
  "packs",
);
console.log(JSON.stringify(cards.slice(0, 2), null, 2));
db.close();
