/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Show, UserButton } from "@clerk/react";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";
import Login from "./Login";
import Authed from "./Authed";

const App = () => {
  const { error, retrySync } = useAuth();
  const user = useUser();

  if (error) {
    return (
      <div
        css={css`
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          text-align: center;
        `}
      >
        <Show when="signed-in">
          <UserButton />
        </Show>
        <Typography variant="h4">Auth bridge configuration is incomplete</Typography>
        <Typography maxWidth="40ch">{error.message}</Typography>
        <Button onClick={retrySync} variant="contained" disableElevation>
          retry auth sync
        </Button>
      </div>
    );
  }

  return user ? <Authed /> : <Login />;
};

export default App;
