import { CalendarEvent, google } from "calendar-link";
import { Event, Fight } from "../types";
import { UnitType } from "dayjs";

export const generateGoogleCalendarLink = (event: Event): string => {
  const calendarEvent: CalendarEvent = {
    title: event.title,
    description: generateFightsDescription(event.fights),
    start: event.date,
    duration: [6, "hour"] as [number, UnitType],
  };

  return google(calendarEvent);
};

const generateFightsDescription = (fights: Fight[]) => {
  const mainEventFights = fights.filter((fight) => fight.main);
  const nonMainEventFights = fights.filter((fight) => !fight.main);

  let fightDescription = "Main Event:\n";

  fightDescription = mainEventFights.reduce(
    (resultStr, currentFight) =>
      resultStr +
      `\n${currentFight.fighterA.name} vs ${currentFight.fighterB.name}`,
    fightDescription,
  );

  fightDescription = fightDescription + "\n\nPrelims:\n";

  fightDescription = nonMainEventFights.reduce(
    (resultStr, currentFight) =>
      resultStr +
      `\n${currentFight.fighterA.name} vs ${currentFight.fighterB.name}`,
    fightDescription,
  );

  return fightDescription;
};
