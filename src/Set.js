/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useContext } from "react";
import { db } from "./firebase";
import SetsContext from "./SetsContext";

export default ({ id }) => {
  const { sets } = useContext(SetsContext);
  const [loading, setLoading] = useState(false);
  const { timestamp, count } = sets[id];

  return (
    <li
      css={css`
        display: flex;
        justify-content: space-evenly;
        padding: 0.5em;
      `}
    >
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
      <div>{timestamp.toDate().toLocaleTimeString()}</div>
      <div>{count}</div>
    </li>
  );
};
