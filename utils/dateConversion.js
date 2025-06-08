import moment from "moment-timezone";

const parseEventDateToUTCISO = (inputDate) => {
  const parsedAmericaNewYorkTzDate = moment.tz(
    inputDate,
    "dddd, MMM D, h:mm A z",
    "America/New_York",
  );

  if (!parsedAmericaNewYorkTzDate.isValid()) {
    console.error("Failed to parse date:", inputDate);
    return null;
  }

  const utcDate = parsedAmericaNewYorkTzDate.clone().utc();

  const isoFormattedDate = utcDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  return isoFormattedDate;
};

const addThreeHoursToDate = (inputDate) => {
  const parsedAmericaNewYorkTzDate = moment.tz(
    inputDate,
    "dddd, MMM D, h:mm A z",
    "America/New_York",
  );

  if (!parsedAmericaNewYorkTzDate.isValid()) {
    console.error("Failed to parse date:", inputDate);
    return null;
  }

  return parsedAmericaNewYorkTzDate
    .add(3, "hours")
    .format("dddd, MMM D, h:mm A z");
};

export { parseEventDateToUTCISO, addThreeHoursToDate };
