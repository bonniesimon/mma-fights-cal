import moment from "moment-timezone";

const handleDate = (inputDate) => {
  const parsedDate = moment.tz(
    inputDate,
    "dddd, MMM D, h:mm A z",
    "America/New_York"
  );

  const istDate = parsedDate.clone().tz("Asia/Kolkata");

  const isoFormattedDate = istDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  return isoFormattedDate;
};

export { handleDate };
