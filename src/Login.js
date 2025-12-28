/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { Button, TextField, Typography } from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState("");
  const { login } = useAuth();

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
      {sent ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <EmailOutlined
            css={css`
              font-size: 100px;
              margin: 0.25em;
            `}
          />
          <Typography
            css={css`
              padding: 0 2em;
            `}
          >
            We sent an email to you at{" "}
            <Typography color="textSecondary" component="span">
              {sent}
            </Typography>
            . It has a magic link that'll sign you in.
          </Typography>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            const { target } = e;
            const field = target.elements.email;
            const email = field.value;

            login(email)
              .then(() => {
                field.value = "";
                setSent(email);
              })
              .catch(setError)
              .finally(() => setLoading(false));
          }}
          css={css`
            width: 100%;
            padding: 1em;
            text-align: center;
          `}
        >
          <Typography
            css={css`
              padding: 0 2em;
            `}
          >
            Get a magic link sent to your email that will sign you in instantly!
          </Typography>
          <TextField
            id="login-email"
            label="email"
            name="email"
            variant="outlined"
            required
            error={!!error}
            helperText={error && error.message}
            fullWidth
            css={css`
              margin-top: 1rem;
            `}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disableElevation
            disabled={loading}
            size="large"
            css={css`
              margin-top: 1rem;
            `}
          >
            send magic link
          </Button>
        </form>
      )}
    </div>
  );
};

export default Login;
