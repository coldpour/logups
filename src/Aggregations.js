/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Typography } from "@material-ui/core";
import { useSets } from "./SetsContext";
import { monthWord, day, daysInMonth } from "./date";
import UL from "./UL";
import CommonLI from "./LI";
import Container from "./Container";

const LI = ({ children, ...rest }) => (
  <CommonLI {...rest}>
    <Container>{children}</Container>
  </CommonLI>
);

const Label = (props) => <Typography {...props} />;
const Value = (props) => <Typography {...props} />;

export default () => {
  const { runningTotal } = useSets();
  const today = new Date();
  const currentMonth = monthWord(today);
  const avg = Math.round(runningTotal / day(today));
  const projection = avg * daysInMonth(today);
  return (
    <UL>
      <LI>
        <Label>{currentMonth} Total</Label>
        <Value>{runningTotal}</Value>
      </LI>
      <LI>
        <Label>Daily Average</Label>
        <Value>{avg}</Value>
      </LI>
      <LI>
        <Label>Projection</Label>
        <Value>{projection}</Value>
      </LI>
    </UL>
  );
};
