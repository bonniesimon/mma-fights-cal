import axios from "axios";

const BASE_URL = window.location.origin;

import { Event } from "../types/Event";

const list = async (): Promise<Event[]> => {
  const response = await axios.get(`${window.location.origin}/api/events`);
  return response.data;
};

const show = async (eventId: string): Promise<Event> => {
  const response = await axios.get(BASE_URL + `/api/events/${eventId}`);
  return response.data;
};

const eventsApi = {
  list,
  show,
};

export default eventsApi;
