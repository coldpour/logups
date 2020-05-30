/** @jsx jsx */
import logo from "./logo.svg";
import { css, jsx } from "@emotion/core";

function App() {
  return (
    <div>
      <header
        css={css`
          background-color: #282c34;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: white;
        `}
      >
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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          css={css`
            color: #61dafb;
          `}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
