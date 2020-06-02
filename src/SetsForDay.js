/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import SetsContext from "./SetsContext";
import { getDay } from "./location";
import Set from "./Set";

export default () => {
  const { setsByDay } = useContext(SetsContext);
  const today = getDay();
  const { sets: todaysSets, total } = setsByDay ? setsByDay[today] : {};

  return todaysSets ? (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1>
        {today} - {total}
      </h1>
      <ul
        css={css`
          padding-left: 0;
          width: 100%;
        `}
      >
        {todaysSets.map(({ id }) => (
          <Set key={id} id={id} />
        ))}
      </ul>
    </div>
  ) : null;
};
