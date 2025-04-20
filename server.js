import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import sequelize from "./db/database.js";
import { scrapeEvents, scrapeEventDetails } from "./scraper.js";
import Event from "./models/Event.js";
import { handleDate } from "./utils/dateConversion.js";
import EventsController from "./controllers/eventsController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/api/scrape", async (_, res) => {
  const events = await scrapeEvents();
  const eventDetails = await scrapeEventDetails(events);

  const eventsToBeSaved = eventDetails.map((event) => ({
    ...event,
    eventId: event.link.split("/").at(-1),
    date: handleDate(event.date),
  }));

  for (const event of eventsToBeSaved) {
    await Event.findOrCreate({
      where: { eventId: event.eventId },
      defaults: { ...event },
    });
  }

  res.json({ status: 200 });
});

app.get("/api/events", EventsController.index);
app.get("/api/events/:eventId", EventsController.show);

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
