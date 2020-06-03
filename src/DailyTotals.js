/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { filterByDay } from "./location";
import SetsContext from "./SetsContext";
import { desc } from "./sort";

const byKey = ([a], [b]) => desc(a, b);

export default () => {
  const { setsByDay } = useContext(SetsContext);

  return (
    setsByDay && (
      <ul>
        {Object.entries(setsByDay)
          .sort(byKey)
          .map(([key, { displayDate, total }]) => (
            <li key={key}>
              <a
                href={filterByDay(key)}
                css={css`
                  color: white;
                  text-decoration: none;
                `}
              >
                {displayDate} - {total}
              </a>
            </li>
          ))}
      </ul>
    )
  );
};
