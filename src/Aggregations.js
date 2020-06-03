/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const TR = (props) => <tr css={css``} {...props} />;

const TD = (props) => (
  <td
    css={css`
      padding: 0.5em;
    `}
    {...props}
  />
);

export default () => {
  return (
    <table>
      <tbody>
        <TR>
          <TD
            css={css`
              min-width: 150px;
              box-sizing: border-box;
            `}
          >
            Running Total
          </TD>
          <TD>0</TD>
        </TR>
        <TR>
          <TD>Daily Average</TD>
          <TD>0</TD>
        </TR>
        <TR>
          <TD>Projection</TD>
          <TD>0</TD>
        </TR>
      </tbody>
    </table>
  );
};
