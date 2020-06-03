export const year = (date) => date.getFullYear();
export const month = (date) => date.getMonth() + 1;
export const paddedMonth = (date) => String(month(date)).padStart(2, 0);
export const day = (date) => date.getDate();
export const paddedDay = (date) => String(day(date)).padStart(2, 0);
export const dayOfWeek = (date) =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];

export const formatAsId = (date) => {
  return `${year(date)}${paddedMonth(date)}${paddedDay(date)}`;
};

export const formatDayOfWeekMonthDay = (date) => {
  return `${dayOfWeek(date)}, ${month(date)}/${day(date)}`;
};
