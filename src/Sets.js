/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { filterByDay } from "./location";
import SetsContext from "./SetsContext";

export default () => {
  const { setsByDay } = useContext(SetsContext);

  return (
    setsByDay && (
      <ul>
        {Object.entries(setsByDay).map(([date, { total }]) => (
          <li key={date}>
            <a
              href={filterByDay(date)}
              css={css`
                color: white;
                text-decoration: none;
              `}
            >
              {date} - {total}
            </a>
          </li>
        ))}
      </ul>
    )
  );
};
