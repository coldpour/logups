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
        reps.value = "";
        db.collection("reps")
          .add({
            count,
            user: user.uid,
            timestamp: new Date(),
          })
          .catch(setError)
          .finally(() => {
            setLoading(false);
          });
      }}
      css={css`
        font-size: 20px;
      `}
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
          min="1"
          step="1"
          disabled={loading}
          required
          variant="outlined"
          error={error}
          helperText={error && error.message}
        />
        <RadiusButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          log
        </RadiusButton>
      </div>
    </form>
  );
};
