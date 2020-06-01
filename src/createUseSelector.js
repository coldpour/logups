import { useContext } from "react";

export default (context) => (getter) => getter(useContext(context));
