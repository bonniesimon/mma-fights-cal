import Event from "../models/Event.js";
import {
  addThreeHoursToDate,
  parseEventDateToUTCISO,
} from "../utils/dateConversion.js";
import TapologyService from "../services/tapologyService.js";

class ScrapeController {
  static show(_, res) {
    res.send(`<!DOCTYPE html>
      <html lang=\"en\">
      <head><title>Scrape Auth</title></head>
      <body style=\"display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;\">
        <form method=\"POST\" action=\"/api/scrape\" style=\"display:flex;flex-direction:column;gap:1em;\">
          <label>Password: <input type=\"password\" name=\"password\" required /></label>
          <button type=\"submit\">Submit</button>
        </form>
      </body>
      </html>`);
  }

  static async scrape(req, res) {
    if (req.body?.password !== process.env.SCRAPE_PASSWORD) {
      return res.status(401).send("<h2>Unauthorized: Incorrect password</h2>");
    }

    const tapologyService = new TapologyService();
    const events = await tapologyService.events();

    const eventsToBeSaved = events.map((event) => ({
      ...event,
      eventId: event.link.split("/").at(-1),
      date: parseEventDateToUTCISO(addThreeHoursToDate(event.date)),
    }));

    for (const event of eventsToBeSaved) {
      await Event.findOrCreate({
        where: { eventId: event.eventId },
        defaults: { ...event },
      });
    }

    res.redirect("/");
  }
}

export default ScrapeController;
