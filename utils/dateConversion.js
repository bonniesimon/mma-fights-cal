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

export { parseEventDateToUTCISO };
