/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default (props) => (
  <ul
    css={css`
      padding-left: 0;
      width: 100%;
    `}
    {...props}
  />
);
