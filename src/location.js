export const filterByDay = (day) => {
  const params = new URLSearchParams(window.location.searh);
  params.append("d", day);
  return `/?${params.toString()}`;
};

export const getDay = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("d");
};
