/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import SetsContext from "./SetsContext";

export default () => {
  const { search } = window.location;
  const { setsByDay } = useContext(SetsContext);
  return (
    <pre>
      {JSON.stringify(search)} {JSON.stringify(setsByDay, null, 2)}
    </pre>
  );
};
