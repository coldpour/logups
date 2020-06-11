/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import UserContext from "./UserContext";
import Login from "./Login";
import Authed from "./Authed";

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user ? <Authed /> : <Login />}
    </UserContext.Provider>
  );
}

export default App;
