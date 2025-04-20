import Event from "../models/Event.js";

class EventsController {
  static async index(_, res) {
    const events = await Event.findAll();

    res.json(events);
  }
}

export default EventsController;
