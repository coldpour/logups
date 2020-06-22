/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const LI = (props) => (
  <li
    css={css`
      align-items: center;
      display: flex;
      padding: 0.25em 0;
    `}
    {...props}
  />
);

export default LI;
