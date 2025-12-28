import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import ThemeProvider from "./ThemeContext";

const AppProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProviders;
