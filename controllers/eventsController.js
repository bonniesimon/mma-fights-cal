import { Op } from "sequelize";
import Event from "../models/Event.js";

class EventsController {
  static async index(_, res) {
    const events = await Event.findAll({
      where: {
        date: {
          [Op.gt]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    res.json(events);
  }

  static async show(req, res) {
    const eventId = req.params.eventId;

    const event = await Event.findOne({ where: { eventId: eventId } });

    res.json(event);
  }
}

export default EventsController;
