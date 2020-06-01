/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useContext } from "react";
import { db } from "./firebase";
import UserContext from "./UserContext";

export default () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
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
      <label>
        <div>reps</div>
        <input
          name="reps"
          css={css`
            font-size: 20px;
          `}
          type="number"
          min="1"
          step="1"
        />
      </label>
      <button
        css={css`
          font-size: 20px;
        `}
        type="submit"
        disabled={loading}
      >
        log
      </button>
      {error && (
        <pre
          css={css`
            color: red;
          `}
        >
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
    </form>
  );
};
