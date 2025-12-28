/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logo from "./logo.svg";

export default () => (
  <img
    src={logo}
    css={css`
      height: 40vmin;
      pointer-events: none;

      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: no-preference) {
        animation: App-logo-spin infinite 20s linear;
      }
    `}
    className="App-logo"
    alt="logo"
  />
);
