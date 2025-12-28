import { useUser } from "./UserContext";
import Login from "./Login";
import Authed from "./Authed";

const App = () => {
  const user = useUser();
  return user ? <Authed /> : <Login />;
};

export default App;
