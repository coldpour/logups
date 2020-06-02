/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useContext } from "react";
import { db } from "./firebase";
import SetsContext from "./SetsContext";

export default ({ id }) => {
  const { sets } = useContext(SetsContext);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const { timestamp, count } = sets[id];

  return (
    <li
      css={css`
        display: flex;
        justify-content: space-evenly;
        padding: 0.5em;
      `}
    >
      {editing ? (
        <button
          disabled={loading}
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
          X
        </button>
      ) : null}
      <div>{timestamp.toDate().toLocaleTimeString()}</div>
      {editing ? (
        <form
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
          <label>
            <div>reps</div>
            <input
              name="reps"
              defaultValue={count}
              min="1"
              step="1"
              type="number"
            />
          </label>
          <button disabled={loading} type="submit">
            OK
          </button>
        </form>
      ) : (
        <button onClick={() => setEditing(true)}>{count}</button>
      )}
    </li>
  );
};
