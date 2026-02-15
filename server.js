import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
const app = express();
app.use(cors());
app.use("/assets", express.static("assets"));
const port = 3000;
let db;

try {
  db = new Database("./data/cards-data.sqlite");
} catch (err) {
  console.error("Database connection error:", err);
  process.exit(1);
}

// all cards
app.get("/cards", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM cards").all();
    res.json(rows);
  } catch (err) {
    console.error("GET /cards error:", err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

// random pack
app.get("/cards/random-pack", (req, res) => {
  try {
    const packNumber = Math.floor(Math.random() * 3) + 1;

    const rows = db
      .prepare("SELECT * FROM cards WHERE pack = ? LIMIT 8")
      .all(packNumber);

    res.json({ pack: packNumber, cards: rows });
  } catch (err) {
    console.error("GET /cards/random-pack error:", err);
    res.status(500).json({ error: "Failed to fetch random pack" });
  }
});
app.listen(port, function () {
  console.log(`> Ready on http://localhost:${port}`);
});
