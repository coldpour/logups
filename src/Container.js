/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Container = ({ component: Component, ...rest }) => (
  <Component
    css={css`
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: auto;
      max-width: 200px;
      padding: 0.25em;
      width: 100%;
    `}
    {...rest}
  />
);

Container.defaultProps = {
  component: "div",
};

export default Container;
