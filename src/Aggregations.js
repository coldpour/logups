/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Typography } from "@material-ui/core";
import { useSets } from "./SetsContext";
import { monthWord, day, daysInMonth } from "./date";

const TR = (props) => <tr css={css``} {...props} />;

const Text = (props) => <Typography component="span" {...props} />;

const TD = ({ children, ...rest }) => (
  <td
    css={css`
      padding: 0.5em;
    `}
    {...rest}
  >
    <Text>{children}</Text>
  </td>
);

const LabelTD = (props) => (
  <TD
    css={css`
      min-width: 150px;
      box-sizing: border-box;
    `}
    {...props}
  />
);

const ValueTD = (props) => (
  <TD
    css={css`
      text-align: right;
    `}
    {...props}
  />
);

export default () => {
  const { runningTotal } = useSets();
  const today = new Date();
  const currentMonth = monthWord(today);
  const avg = Math.round(runningTotal / day(today));
  const projection = avg * daysInMonth(today);
  return (
    <table>
      <tbody>
        <TR>
          <LabelTD>{currentMonth} Total</LabelTD>
          <ValueTD>{runningTotal}</ValueTD>
        </TR>
        <TR>
          <LabelTD>Daily Average</LabelTD>
          <ValueTD>{avg}</ValueTD>
        </TR>
        <TR>
          <LabelTD>Projection</LabelTD>
          <ValueTD>{projection}</ValueTD>
        </TR>
      </tbody>
    </table>
  );
};
