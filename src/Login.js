/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const Login = () => {
  return (
    <div
      css={css`
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: auto;
        max-width: 375px;
      `}
    >
      <Typography variant="h1">LogUps</Typography>
      <Typography
        css={css`
          padding: 0 2em;
          text-align: center;
          margin-top: 1rem;
        `}
      >
        Sign in with Clerk to keep your reps synced across production and local
        development.
      </Typography>
      <Show when="signed-out">
        <div
          css={css`
            width: 100%;
            padding: 1em;
            text-align: center;
          `}
        >
          <div
            css={css`
              display: grid;
              gap: 1rem;
              margin-top: 1rem;
            `}
          >
            <SignInButton mode="modal">
              <Button variant="contained" size="large" disableElevation fullWidth>
                sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outlined" size="large" fullWidth>
                create account
              </Button>
            </SignUpButton>
          </div>
        </div>
      </Show>
      <Show when="signed-in">
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-top: 2rem;
          `}
        >
          <UserButton />
          <Typography>Finishing your session…</Typography>
        </div>
      </Show>
    </div>
  );
};

export default Login;
