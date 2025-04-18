import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import path from "path";

import sequelize from "./db/database.js";
import { scrapeEvents, scrapeEventDetails } from "./scraper.js";
import Event from "./models/Event.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cache data with expiration
let eventsCache = null;
let detailedEventsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Check if cache is valid
const isCacheValid = () => {
  return lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION;
};

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/api/scrape", async (_, res) => {
  const events = await scrapeEvents();
  const eventDetails = await scrapeEventDetails(events);

  console.log(eventDetails[0]);

  const eventsToBeSaved = eventDetails.map((event) => {
    return {
      ...event,
      eventId: event.link.split("/").at(-1),
    };
  });

  for (const event of eventsToBeSaved) {
    await Event.findOrCreate({
      where: { eventId: event.eventId },
      defaults: { ...event },
    });
  }

  res.json({ status: 200 });
});

// Routes
app.get("/api", (req, res) => {
  res.json({
    message: "MMA Events Scraper API",
    endpoints: [
      { path: "/api/events", description: "Get upcoming MMA events" },
      {
        path: "/api/events/details",
        description: "Get upcoming MMA events with fight details",
      },
    ],
  });
});

// Get upcoming events
app.get("/api/events", async (req, res) => {
  try {
    if (eventsCache && isCacheValid()) {
      console.log("Serving events from cache");
      return res.json(eventsCache);
    }

    console.log("Fetching fresh events data...");
    const events = await scrapeEvents();

    // Update cache
    eventsCache = events;
    lastFetchTime = Date.now();

    res.json(events);
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch events", message: error.message });
  }
});

// Get upcoming events with detailed fight cards
app.get("/api/events/details", async (req, res) => {
  try {
    if (detailedEventsCache && isCacheValid()) {
      console.log("Serving detailed events from cache");
      return res.json(detailedEventsCache);
    }

    console.log("Fetching fresh detailed events data...");
    const events = await scrapeEvents();
    const eventsWithDetails = await scrapeEventDetails(events);

    // Update cache
    eventsCache = events;
    detailedEventsCache = eventsWithDetails;
    lastFetchTime = Date.now();

    res.json(eventsWithDetails);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Failed to fetch detailed events",
      message: error.message,
    });
  }
});

// Get single event details by ID
app.get("/api/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // First try to get events from cache or fetch fresh data
    let events;
    if (eventsCache && isCacheValid()) {
      events = eventsCache;
    } else {
      events = await scrapeEvents();
      eventsCache = events;
      lastFetchTime = Date.now();
    }

    // Find the event with the matching ID (from the last part of the URL)
    const event = events.find((e) => {
      const urlParts = e.link.split("/");
      const linkId = urlParts[urlParts.length - 1];
      return linkId === eventId;
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Get the full details for just this event
    const [eventWithDetails] = await scrapeEventDetails([event]);

    res.json(eventWithDetails);
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch event details", message: error.message });
  }
});

// Clear cache endpoint
app.post("/api/cache/clear", (req, res) => {
  eventsCache = null;
  detailedEventsCache = null;
  lastFetchTime = null;
  res.json({ message: "Cache cleared successfully" });
});

// Error handling middleware
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

// Start server
app.listen(PORT, () => {
  console.log(`MMA Events API server running on port ${PORT}`);
});

export default app;
