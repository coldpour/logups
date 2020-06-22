/** @jsx jsx */
import { jsx } from "@emotion/core";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import ThemeProvider from "./ThemeContext";

export default ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  </ThemeProvider>
);
