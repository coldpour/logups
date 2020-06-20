/** @jsx jsx */
import { jsx } from "@emotion/core";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";

export default ({ children }) => (
  <AuthProvider>
    <UserProvider>{children}</UserProvider>
  </AuthProvider>
);
