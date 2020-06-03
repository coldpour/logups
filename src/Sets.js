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
        {Object.entries(setsByDay).map(([key, { displayDate, total }]) => (
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
