/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete, Check, Close } from "@material-ui/icons";
import { db } from "./firebase";
import { useSets } from "./SetsContext";

export default ({ id }) => {
  const { sets } = useSets();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(id === "nypydQ5cTGkrGptXbenI");
  // const [editing, setEditing] = useState(false);
  const { timestamp, count } = sets[id];

  return (
    <li
      css={css`
        display: flex;
        padding: 0.25em 0;
        background: palevioletred;
        justify-content: center;
        height: 70px;
      `}
    >
      {editing ? (
        <form
          css={css`
            max-width: 200px;
            align-items: center;
            display: flex;
            position: relative;
            padding: 0.25em;
            background: red;
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
              background: lightblue;
              padding: 10px;
            `}
            onClick={() => {
              setLoading(true);
              db.collection("reps")
                .doc(id)
                .delete()
                .catch((err) => {
                  setLoading(false);
                });
            }}
          >
            <Delete />
          </IconButton>
          <Typography
            css={css`
              background: firebrick;
              flex: 0 0 auto;
            `}
          >
            {timestamp.toDate().toLocaleTimeString()}
          </Typography>
          <TextField
            css={css``}
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
              display: flex;
            `}
          >
            <IconButton
              css={css`
                min-width: auto;
                background: orangered;
                padding: 10px;
              `}
              color="primary"
              disabled={loading}
              type="submit"
            >
              <Check />
            </IconButton>
            <IconButton
              css={css`
                min-width: auto;
                background: orange;
                padding: 10px;
              `}
              disabled={loading}
              type="reset"
            >
              <Close />
            </IconButton>
          </ButtonGroup>
        </form>
      ) : (
        <Button
          css={css`
            background: red;
            display: flex;
            flex: 1;
            padding: 0.25em;
            justify-content: space-between;
            align-items: center;
            max-width: 200px;
          `}
          onClick={() => setEditing(true)}
        >
          <Typography
            css={css`
              background: firebrick;
              flex: 0 0 auto;
            `}
          >
            {timestamp.toDate().toLocaleTimeString()}
          </Typography>
          <Typography
            css={css`
              background: indianred;
            `}
          >
            {count}
          </Typography>
        </Button>
      )}
    </li>
  );
};
