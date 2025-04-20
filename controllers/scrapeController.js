import Event from "../models/Event.js";
import { handleDate } from "../utils/dateConversion.js";
import TapologyService from "../services/tapologyService.js";

class ScrapeController {
  static async scrape(_, res) {
    const tapologyService = new TapologyService();
    const events = await tapologyService.events();

    const eventsToBeSaved = events.map((event) => ({
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
