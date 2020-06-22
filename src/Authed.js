/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Logo from "./Logo";
import DailyTotals from "./DailyTotals";
import RepForm from "./RepForm";
import { SetsProvider } from "./SetsContext";
import SetsForDay from "./SetsForDay";
import Aggregations from "./Aggregations";
import { hasDay } from "./location";

export default () => {
  return (
    <SetsProvider>
      {hasDay() ? (
        <SetsForDay />
      ) : (
        <header
          css={css`
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem 0;
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
