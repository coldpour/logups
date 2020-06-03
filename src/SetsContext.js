import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "./firebase";
import UserContext from "./UserContext";
import createUseSelector from "./createUseSelector";
import { formatAsId, formatDayOfWeekMonthDay } from "./date";

const SetsContext = createContext();

export const useSelector = createUseSelector(SetsContext);
export const selectSets = ({ sets }) => sets;

export default SetsContext;

export const SetsProvider = (props) => {
  const [sets, setSets] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    db.collection("reps")
      .where("user", "==", user.uid)
      .limit(50)
      .onSnapshot((snapshot) => {
        if (!snapshot.size) setSets(null);
        else {
          setSets(
            snapshot.docs.reduce(
              (next, doc) => ({ ...next, [doc.id]: doc.data() }),
              {}
            )
          );
        }
      });
  }, [user.uid]);

  const setsByDay =
    sets &&
    Object.entries(sets).reduce((grouped, [id, { count, timestamp }]) => {
      const date = timestamp.toDate();
      const key = formatAsId(date);

      const nextEntry = { id, count, timestamp };
      const entry = grouped[key];
      const total = entry ? entry.total + count : count;
      const sets = entry ? [...entry.sets, nextEntry] : [nextEntry];
      const displayDate = formatDayOfWeekMonthDay(date);
      return {
        ...grouped,
        [key]: { total, displayDate, sets },
      };
    }, {});

  return <SetsContext.Provider value={{ sets, setsByDay }} {...props} />;
};
