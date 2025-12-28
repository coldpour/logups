import { useContext } from "react";

const createUseSelector = (context) => (getter) => getter(useContext(context));

export default createUseSelector;
