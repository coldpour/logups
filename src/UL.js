/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const UL = (props) => (
  <ul
    css={css`
      padding-left: 0;
      width: 100%;
    `}
    {...props}
  />
);

export default UL;
