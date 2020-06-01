export const filterByDay = (day) => {
  const params = new URLSearchParams(window.location.searh);
  params.append("d", day);
  return `/?${params.toString()}`;
};
