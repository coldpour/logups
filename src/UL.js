/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default (props) => (
  <ul
    css={css`
      padding-left: 0;
      width: 100%;
    `}
    {...props}
  />
);
