/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import spinner from "./spinner.svg";

export default () => (
  <div
    css={css`
      display: flex;
      min-height: 100vh;
      justify-content: center;
      align-items: center;
    `}
  >
    <img
      src={spinner}
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
          animation: App-logo-spin infinite 2s linear;
        }
      `}
      alt="loading..."
    />
  </div>
);
