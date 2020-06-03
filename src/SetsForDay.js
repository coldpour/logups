/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import SetsContext from "./SetsContext";
import { getDay } from "./location";
import Set from "./Set";
import { asc } from "./sort";
import UL from "./UL";

const byTimestamp = ({ timestamp: a }, { timestamp: b }) =>
  asc(a.toDate(), b.toDate());

export default () => {
  const { setsByDay } = useContext(SetsContext);
  const today = getDay();
  const { sets: todaysSets, total, displayDate } = setsByDay
    ? setsByDay[today]
    : {};

  return todaysSets ? (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1>
        {displayDate} - {total}
      </h1>
      <UL>
        {todaysSets.sort(byTimestamp).map(({ id }) => (
          <Set key={id} id={id} />
        ))}
      </UL>
    </div>
  ) : null;
};
