/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button, Typography } from "@material-ui/core";
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
                padding: 0.25em 0;
              `}
            >
              <Button
                href={filterByDay(key)}
                css={css`
                  display: flex;
                  flex: 1;
                  text-transform: none;
                  justify-content: space-between;
                  max-width: 200px;
                `}
              >
                <Typography>{displayDate}</Typography>
                <Typography>{total}</Typography>
              </Button>
            </li>
          ))}
      </UL>
    )
  );
};
