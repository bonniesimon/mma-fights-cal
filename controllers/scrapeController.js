import {
  scrapeEvents,
  scrapeEventDetails,
} from "../services/scrapperService.js";
import Event from "../models/Event.js";
import { handleDate } from "../utils/dateConversion.js";

class ScrapeController {
  static async scrape(_, res) {
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
  }
}

export default ScrapeController;
