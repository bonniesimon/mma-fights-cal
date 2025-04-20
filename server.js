import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import sequelize from "./db/database.js";
import EventsController from "./controllers/eventsController.js";
import ScrapeController from "./controllers/scrapeController.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/api/scrape", ScrapeController.scrape);

app.get("/api/events", EventsController.index);
app.get("/api/events/:eventId", EventsController.show);

app.use((err, _req, res, _next) => {
  console.error("Server error:", err);
  res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
});

// Serve static files only in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`MMA Events API server running on port ${PORT}`);
});

export default app;
