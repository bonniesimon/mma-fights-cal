import axios from "axios";

const BASE_URL = window.location.origin;

const list = () => axios.get(`${window.location.origin}/api/events`);
const show = (eventId) => axios.get(BASE_URL + `/api/events/${eventId}`);

const eventsApi = {
  list,
  show,
};

export default eventsApi;
