/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "./firebase";
import { useUser } from "./UserContext";

const useStylesRadiusField = makeStyles(() => ({
  root: {
    "border-top-right-radius": 0,
    "border-bottom-right-radius": 0,
  },
}));

const RadiusField = ({ InputProps, ...rest }) => {
  const classes = useStylesRadiusField();
  return <TextField InputProps={{ classes, ...InputProps }} {...rest} />;
};

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
        <RadiusField
          id="log-reps"
          label="reps"
          name="reps"
          type="number"
          disabled={loading}
          required
          variant="outlined"
          error={!!error}
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
