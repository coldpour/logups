/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Logo from "./Logo";
import DailyTotals from "./DailyTotals";
import RepForm from "./RepForm";
import { SetsProvider } from "./SetsContext";
import SetsForDay from "./SetsForDay";
import Aggregations from "./Aggregations";

export default () => {
  const { search } = window.location;
  return (
    <SetsProvider>
      {search ? (
        <SetsForDay />
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
          <Aggregations />
          <Logo />
          <RepForm />
          <DailyTotals />
        </header>
      )}
    </SetsProvider>
  );
};
