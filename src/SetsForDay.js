/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { useSets } from "./SetsContext";
import { getDay } from "./location";
import Set from "./Set";
import { asc } from "./sort";
import UL from "./UL";

const byTimestamp = ({ timestamp: a }, { timestamp: b }) =>
  asc(a.toDate(), b.toDate());

export default () => {
  const { setsByDay } = useSets();
  const today = getDay();
  const {
    sets: todaysSets,
    total,
    displayDate,
  } = setsByDay ? setsByDay[today] : {};

  return todaysSets ? (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
      `}
    >
      <Typography
        variant="h1"
        css={css`
          font-size: 3rem;
        `}
      >
        {displayDate} - {total}
      </Typography>
      <UL>
        {todaysSets.sort(byTimestamp).map(({ id }) => (
          <Set key={id} id={id} />
        ))}
      </UL>
    </div>
  ) : null;
};
