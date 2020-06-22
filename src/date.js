export const year = (date) => date.getFullYear();
export const month = (date) => date.getMonth() + 1;
export const paddedMonth = (date) => String(month(date)).padStart(2, 0);
export const day = (date) => date.getDate();
export const paddedDay = (date) => String(day(date)).padStart(2, 0);
export const dayOfWeek = (date) =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
export const monthWord = (date) =>
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December",
  ][date.getMonth()];
export const daysInMonth = (date) =>
  [31, year(date) % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
    date.getMonth()
  ];

export const formatAsId = (date) => {
  return `${year(date)}${paddedMonth(date)}${paddedDay(date)}`;
};

export const formatDayOfWeekMonthDay = (date) => {
  return `${dayOfWeek(date)}, ${month(date)}/${day(date)}`;
};

export const firstDayOfMonth = (date) => {
  return new Date(year(date), date.getMonth(), 1);
};
