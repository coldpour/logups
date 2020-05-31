/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import { db } from "./firebase";
import UserContext from "./UserContext";

export default () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sets, setSets] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    db.collection("reps")
      .where("user", "==", user.uid)
      .limit(50)
      .onSnapshot((snapshot) => {
        if (!snapshot.size) setSets(null);
        else {
          setSets(
            snapshot.docs.reduce(
              (next, doc) => ({ ...next, [doc.id]: doc.data() }),
              {}
            )
          );
        }
      });
  }, [user.uid]);

  return (
    <header
      css={css`
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      `}
    >
      <img
        src={logo}
        css={css`
          height: 40vmin;
          pointer-events: none;

          @keyframes App-logo-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @media (prefers-reduced-motion: no-preference) {
            animation: App-logo-spin infinite 20s linear;
          }
        `}
        className="App-logo"
        alt="logo"
      />
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
      {sets && (
        <div>
          <h1>reps:</h1>
          <ul>
            {Object.entries(sets).map(([id, { count, timestamp }]) => (
              <li key={id}>
                <ul>
                  <li>{count}</li>
                  <li>{timestamp.toDate().toLocaleString()}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
