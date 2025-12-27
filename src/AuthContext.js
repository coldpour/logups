import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "./firebase";
import FullPageSpinner from "./FullPageSpinner";

const AuthContext = createContext();

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: window.location.href,
  // This must be true.
  handleCodeInApp: true,
};

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        setLoading(false);
      } else if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let emailForSignIn = window.localStorage.getItem("emailForSignIn");
        if (!emailForSignIn) {
          emailForSignIn = window.prompt(
            "Please provide your email for confirmation",
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
          .catch(setError)
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  if (loading) {
    return <FullPageSpinner />;
  }

  const login = (email) =>
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      });

  return <AuthContext.Provider value={{ user, login }} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
