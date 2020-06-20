/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { filterByDay } from "./location";
import { useSets } from "./SetsContext";
import { desc } from "./sort";
import UL from "./UL";

const byKey = ([a], [b]) => desc(a, b);

export default () => {
  const { setsByDay } = useSets();

  return (
    setsByDay && (
      <UL>
        {Object.entries(setsByDay)
          .sort(byKey)
          .map(([key, { displayDate, total }]) => (
            <li
              key={key}
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              <a
                href={filterByDay(key)}
                css={css`
                  color: white;
                  text-decoration: none;
                  display: flex;
                  flex: 1;
                  padding: 0.5em;
                  max-width: 125px;
                `}
              >
                <div
                  css={css`
                    flex: 1;
                  `}
                >
                  {displayDate}
                </div>
                <div>{total}</div>
              </a>
            </li>
          ))}
      </UL>
    )
  );
};
