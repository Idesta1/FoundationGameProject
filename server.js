import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());

// Block access to sensitive directories
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  if (p.startsWith("/node_modules") || p.startsWith("/.git")) {
    return res.status(403).end();
  }
  next();
});

// Serve all frontend static files
app.use(express.static(__dirname, { index: "index.html", dotfiles: "deny" }));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`> Ready on http://localhost:${port}`);
});
