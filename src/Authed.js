/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Show, UserButton } from "@clerk/react";
import DailyTotals from "./DailyTotals";
import RepForm from "./RepForm";
import { SetsProvider } from "./SetsContext";
import SetsForDay from "./SetsForDay";
import Aggregations from "./Aggregations";
import { hasDay } from "./location";

const Authed = () => {
  return (
    <SetsProvider>
      <Show when="signed-in">
        <div
          css={css`
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1;
          `}
        >
          <UserButton />
        </div>
      </Show>
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
          <RepForm />
          <DailyTotals />
        </header>
      )}
    </SetsProvider>
  );
};

export default Authed;
