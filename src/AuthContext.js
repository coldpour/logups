import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser as useClerkUser } from "@clerk/react";
import firebase from "./firebase";
import FullPageSpinner from "./FullPageSpinner";

const AuthContext = createContext();

const getFirebaseTokenEndpoint = () =>
  import.meta.env.VITE_FIREBASE_CUSTOM_TOKEN_URL ||
  "https://us-central1-logups-dbc17.cloudfunctions.net/firebaseCustomToken";

const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth();
  const { user: clerkUser } = useClerkUser();
  const [firebaseUser, setFirebaseUser] = useState(firebase.auth().currentUser);
  const [bridging, setBridging] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => firebase.auth().onAuthStateChanged(setFirebaseUser), []);

  useEffect(() => {
    if (!isLoaded) {
      return undefined;
    }

    let isCurrent = true;

    const syncFirebaseSession = async () => {
      if (!isSignedIn || !clerkUser) {
        setError(null);

        if (firebase.auth().currentUser) {
          setBridging(true);

          try {
            await firebase.auth().signOut();
          } finally {
            if (isCurrent) {
              setBridging(false);
            }
          }
        }

        return;
      }

      if (firebase.auth().currentUser?.uid === clerkUser.id) {
        setError(null);
        return;
      }

      setBridging(true);

      try {
        const clerkSessionToken = await getToken();

        if (!clerkSessionToken) {
          throw new Error("Clerk session token is unavailable.");
        }

        const response = await fetch(getFirebaseTokenEndpoint(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${clerkSessionToken}`,
          },
        });
        const payload = await response.json().catch(() => ({}));

        if (!response.ok || !payload.firebaseToken) {
          throw new Error(
            payload.error || "Unable to exchange Clerk session for Firebase auth.",
          );
        }

        await firebase.auth().signInWithCustomToken(payload.firebaseToken);

        if (isCurrent) {
          setError(null);
        }
      } catch (nextError) {
        if (isCurrent) {
          setError(nextError);
        }
      } finally {
        if (isCurrent) {
          setBridging(false);
        }
      }
    };

    syncFirebaseSession();

    return () => {
      isCurrent = false;
    };
  }, [clerkUser, getToken, isLoaded, isSignedIn, retryCount]);

  const user =
    isSignedIn && clerkUser && firebaseUser?.uid === clerkUser.id
      ? {
          uid: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || null,
          displayName:
            clerkUser.fullName ||
            clerkUser.username ||
            clerkUser.primaryEmailAddress?.emailAddress ||
            "User",
          clerkUser,
        }
      : null;

  const loading =
    !isLoaded ||
    bridging ||
    (isSignedIn && !!clerkUser && firebaseUser?.uid !== clerkUser.id && !error);

  const retrySync = () => {
    setError(null);
    setRetryCount((count) => count + 1);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, retrySync }}>
      {loading ? <FullPageSpinner /> : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
