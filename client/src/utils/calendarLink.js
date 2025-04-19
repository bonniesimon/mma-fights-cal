import { google } from "calendar-link";

export const generateGoogleCalendarLink = (event) => {
  const calendarEvent = {
    title: event.title,
    description: generateFightsDescription(event.fights),
    start: event.date,
    duration: [6, "hour"],
  };

  return google(calendarEvent);
};

const generateFightsDescription = (fights) => {
  const mainEventFights = fights.filter((fight) => fight.main);
  const nonMainEventFights = fights.filter((fight) => !fight.main);

  let fightDescription = "Main Event:\n";

  fightDescription = mainEventFights.reduce(
    (resultStr, currentFight) =>
      resultStr +
      `\n${currentFight.fighterA.name} vs ${currentFight.fighterB.name}`,
    fightDescription
  );

  fightDescription = fightDescription + "\n\nPrelims:\n";

  fightDescription = nonMainEventFights.reduce(
    (resultStr, currentFight) =>
      resultStr +
      `\n${currentFight.fighterA.name} vs ${currentFight.fighterB.name}`,
    fightDescription
  );

  return fightDescription;
};
