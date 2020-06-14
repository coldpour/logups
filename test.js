const fs = require("fs");
const path = require("path");
const firebase = require("@firebase/testing");

const projectId = "coldpour-test-project";

beforeAll(async () => {
  const rulesContent = fs.readFileSync(
    path.resolve(__dirname, "firestore.rules"),
    "utf8"
  );
  await firebase.loadFirestoreRules({
    projectId,
    rules: rulesContent,
  });
});

afterAll(() => {
  firebase.apps().forEach((app) => app.delete());
});

const alice = { uid: "alice", email: "alice@example.com" };
const bob = { uid: "bob", email: "bob@example.com" };

const validAliceReps = {
  count: 1,
  user: alice.uid,
  timestamp: new Date(),
};

describe("when not logged in", () => {
  const db = firebase
    .initializeTestApp({
      projectId,
    })
    .firestore();

  test("reps cannot be created", async () => {
    await firebase.assertFails(db.collection("reps").add(validAliceReps));
  });
});

describe("when logged in as alice", () => {
  const db = firebase
    .initializeTestApp({
      projectId,
      auth: alice,
    })
    .firestore();
  const reps = db.collection("reps");

  test("alice can create reps for herself", async () => {
    await firebase.assertSucceeds(reps.add(validAliceReps));
  });

  [
    ["for no user", ({ count, timestamp }) => ({ count, timestamp })],
    ["for other users", (o) => ({ ...o, user: bob.uid })],
    ["with a negative count", (o) => ({ ...o, count: -20 })],
    ["with a string count", (o) => ({ ...o, count: "1" })],
    ["without a count", ({ user, timestamp }) => ({ user, timestamp })],
    ["without timestamp", ({ user, count }) => ({ user, count })],
    ["with a string timestamp", (o) => ({ ...o, timestamp: "123" })],
    ["with a number timestamp", (o) => ({ ...o, timestamp: 123 })],
  ].forEach(([desc, argFn]) => {
    const arg = argFn(validAliceReps);
    test(`alice cannot create reps ${desc}: ${JSON.stringify(arg)}`, async () =>
      await firebase.assertFails(reps.add(arg)));
  });
});
