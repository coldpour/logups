import { useUser } from "./UserContext";
import Login from "./Login";
import Authed from "./Authed";

export default () => {
  const user = useUser();
  return user ? <Authed /> : <Login />;
};
