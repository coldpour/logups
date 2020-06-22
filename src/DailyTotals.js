/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Button, Typography } from "@material-ui/core";
import { filterByDay } from "./location";
import { useSets } from "./SetsContext";
import { desc } from "./sort";
import UL from "./UL";
import LI from "./LI";
import Container from "./Container";

const byKey = ([a], [b]) => desc(a, b);

export default () => {
  const { setsByDay } = useSets();

  return (
    setsByDay && (
      <UL>
        {Object.entries(setsByDay)
          .sort(byKey)
          .map(([key, { displayDate, total }]) => (
            <LI key={key}>
              <Container
                component={Button}
                href={filterByDay(key)}
                css={css`
                  text-transform: none;
                `}
              >
                <Typography>{displayDate}</Typography>
                <Typography>{total}</Typography>
              </Container>
            </LI>
          ))}
      </UL>
    )
  );
};
