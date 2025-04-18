export const toIst = (utcDateString) => {
  const utcDate = new Date(utcDateString);

  const istOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const istDateTime = utcDate.toLocaleString("en-IN", istOptions);

  return istDateTime;
};
