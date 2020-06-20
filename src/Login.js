/** @jsx jsx */
import { useState } from "react";
import { css, jsx } from "@emotion/core";
import { useAuth } from "./AuthContext";

export default () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { login } = useAuth();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        const { target } = e;
        const field = target.elements.email;
        const email = field.value;
        field.value = "";
        login(email)
          .then(() => setSent(true))
          .catch(setError)
          .finally(() => setLoading(false));
      }}
      css={css`
        font-size: 20px;
      `}
    >
      <label>
        <div>email</div>
        <input
          name="email"
          css={css`
            font-size: 20px;
          `}
          type="email"
        />
      </label>
      <button
        css={css`
          font-size: 20px;
        `}
        type="submit"
        disabled={loading}
      >
        login
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
      {sent && <div> check your inbox! </div>}
    </form>
  );
};
