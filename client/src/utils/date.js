export const formatUtcToLocal = (utcDateString) => {
  const date = new Date(utcDateString);

  if (isNaN(date.getTime())) {
    console.error("Invalid date string provided:", utcDateString);
    return "Invalid Date";
  }

  const localOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const localDateTime = date.toLocaleString(undefined, localOptions);

  return localDateTime;
};
