/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Logo from "./Logo";
import Sets from "./Sets";
import RepForm from "./RepForm";
import { SetsProvider } from "./SetsContext";

export default () => {
  const { search } = window.location;
  return (
    <SetsProvider>
      {search ? (
        <pre>{JSON.stringify(search)}</pre>
      ) : (
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
          <Logo />
          <RepForm />
          <Sets />
        </header>
      )}
    </SetsProvider>
  );
};
