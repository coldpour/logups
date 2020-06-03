/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import SetsContext from "./SetsContext";
import { monthWord, day, daysInMonth } from "./date";

const TR = (props) => <tr css={css``} {...props} />;

const TD = (props) => (
  <td
    css={css`
      padding: 0.5em;
    `}
    {...props}
  />
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
  const { runningTotal } = useContext(SetsContext);
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
