import { scrapeEvents, scrapeEventDetails } from "./scrapperService.js";

export default class TapologyService {
  async events() {
    const events = await scrapeEvents();
    const eventDetails = await scrapeEventDetails(events);

    return eventDetails;
  }
}
