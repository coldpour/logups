/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { db } from "./firebase";
import { filterByDay } from "./location";

export default () => {
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

  return (
    sets && (
      <ul>
        {Object.entries(
          Object.entries(sets).reduce((grouped, [id, { count, timestamp }]) => {
            const dateString = timestamp.toDate().toDateString();
            const sum = grouped[dateString];
            return {
              ...grouped,
              [dateString]: sum ? sum + count : count,
            };
          }, {})
        ).map(([date, total]) => (
          <li key={date}>
            <a
              href={filterByDay(date)}
              css={css`
                color: white;
                text-decoration: none;
              `}
            >
              {date} - {total}
            </a>
          </li>
        ))}
      </ul>
    )
  );
};
