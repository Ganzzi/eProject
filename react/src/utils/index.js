export const formatDateTime = (dateTimeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(undefined, options);
};
