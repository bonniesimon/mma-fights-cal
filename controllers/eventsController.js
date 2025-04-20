import Event from "../models/Event.js";

class EventsController {
  static async index(_, res) {
    const events = await Event.findAll();

    res.json(events);
  }

  static async show(req, res) {
    const eventId = req.params.eventId;

    const event = await Event.findOne({ where: { eventId: eventId } });

    res.json(event);
  }
}

export default EventsController;
