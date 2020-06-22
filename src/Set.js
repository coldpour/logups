/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  IconButton as MIconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete, Check, Close } from "@material-ui/icons";
import { db } from "./firebase";
import { useSets } from "./SetsContext";
import Container from "./Container";
import LI from "./LI";

const IconButton = ({ disableElevation, fullWidth, ...props }) => (
  <MIconButton
    css={css`
      padding: 10px;
      min-width: auto;
    `}
    {...props}
  />
);

const ResetButton = (props) => (
  <IconButton type="reset" {...props}>
    <Close />
  </IconButton>
);

const SubmitButton = ({ color, ...props }) => (
  <IconButton color="primary" type="submit" {...props}>
    <Check />
  </IconButton>
);

const Timestamp = ({ value }) => (
  <Typography
    css={css`
      flex: 0 0 auto;
    `}
  >
    {value.toDate().toLocaleTimeString()}
  </Typography>
);

export default ({ id }) => {
  const { sets } = useSets();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const { timestamp, count } = sets[id];

  return (
    <LI
      css={css`
        height: 70px;
      `}
    >
      {editing ? (
        <Container
          component="form"
          css={css`
            position: relative;
          `}
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            db.collection("reps")
              .doc(id)
              .update({ count: parseInt(e.target.elements.reps.value, 10) })
              .finally(() => {
                setLoading(false);
                setEditing(false);
              });
          }}
        >
          <IconButton
            disabled={loading}
            color="secondary"
            css={css`
              position: absolute;
              right: 100%;
            `}
            onClick={() => {
              setLoading(true);
              db.collection("reps")
                .doc(id)
                .delete()
                .finally(() => setLoading(false));
            }}
          >
            <Delete />
          </IconButton>
          <Timestamp value={timestamp} />

          <TextField
            css={css`
              max-width: 90px;
            `}
            id={`reps-${id}`}
            name="reps"
            defaultValue={count}
            label="reps"
            type="number"
            variant="outlined"
            disabled={loading}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: "1",
              step: "1",
              style: { textAlign: "right" },
            }}
          />
          <ButtonGroup
            css={css`
              position: absolute;
              left: 100%;
            `}
          >
            <SubmitButton disabled={loading} />
            <ResetButton disabled={loading} />
          </ButtonGroup>
        </Container>
      ) : (
        <Container component={Button} onClick={() => setEditing(true)}>
          <Timestamp value={timestamp} />
          <Typography>{count}</Typography>
        </Container>
      )}
    </LI>
  );
};
