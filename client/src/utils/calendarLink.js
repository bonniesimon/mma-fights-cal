import { google } from "calendar-link";

export const generateGoogleCalendarLink = (event) => {
  const calendarEvent = {
    title: event.title,
    start: event.date,
    duration: [6, "hour"],
  };

  return google(calendarEvent);
};
