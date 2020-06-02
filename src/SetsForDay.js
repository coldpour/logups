/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useContext } from "react";
import SetsContext from "./SetsContext";
import { getDay } from "./location";

export default () => {
  const { setsByDay } = useContext(SetsContext);
  const today = getDay();
  const { sets: todaysSets, total } = setsByDay ? setsByDay[today] : {};

  return todaysSets ? (
    <ul>
      <h1>
        {today} - {total}
      </h1>
      {todaysSets.map(({ id, count, timestamp }) => (
        <li key={id}>
          {timestamp.toDate().toLocaleTimeString()} - {count}
        </li>
      ))}
    </ul>
  ) : null;
};
