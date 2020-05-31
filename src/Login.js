/** @jsx jsx */
import { useState, useEffect, useContext } from "react";
import { css, jsx } from "@emotion/core";
import firebase from "./firebase";
import UserContext from "./UserContext";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: "http://localhost:3000",
  // This must be true.
  handleCodeInApp: true,
};

export default () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let emailForSignIn = window.localStorage.getItem("emailForSignIn");
        if (!emailForSignIn) {
          emailForSignIn = window.prompt(
            "Please provide your email fro confirmation"
          );
        }
        firebase
          .auth()
          .signInWithEmailLink(emailForSignIn, window.location.href)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
            const { user } = result;
            setUser(user);
          })
          .catch(setError);
      }
    });
  }, [setUser]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { target } = e;
        const email = target.elements.email.value;
        setLoading(true);
        firebase
          .auth()
          .sendSignInLinkToEmail(email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem("emailForSignIn", email);
          })
          .catch(setError)
          .finally(setLoading(false));
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
    </form>
  );
};
