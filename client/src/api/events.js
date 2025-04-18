import axios from "axios";

const list = () => axios.get(`${window.location.origin}/api/events`);

const eventsApi = {
  list,
};

export default eventsApi;
