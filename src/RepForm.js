/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { db } from "./firebase";
import { useUser } from "./UserContext";

const RadiusButton = (props) => (
  <Button
    css={css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
    {...props}
  />
);

export default () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const errorMessage = error && error.message;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        const {
          target: {
            elements: { reps },
          },
        } = e;
        const count = parseInt(reps.value, 10);
        db.collection("reps")
          .add({
            count,
            user: user.uid,
            timestamp: new Date(),
          })
          .then(() => {
            reps.value = "";
          })
          .catch(setError)
          .finally(() => {
            setLoading(false);
          });
      }}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <TextField
          id="log-reps"
          label="reps"
          name="reps"
          type="number"
          disabled={loading}
          required
          variant="outlined"
          error={!!error}
          css={css`
            .MuiOutlinedInput-root {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
          `}
          inputProps={{
            min: "1",
            step: "1",
          }}
        />
        <RadiusButton
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          disabled={loading}
        >
          log
        </RadiusButton>
      </div>
      {errorMessage && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          align="center"
        >
          {errorMessage}
        </Typography>
      )}
    </form>
  );
};
