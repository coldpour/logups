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

  test("alice cannot create reps for other users", async () => {
    await firebase.assertFails(reps.add({ ...validAliceReps, user: bob.uid }));
  });

  test("alice cannot create reps with a negative count", async () => {
    await firebase.assertFails(reps.add({ ...validAliceReps, count: -20 }));
  });

  test("alice cannot create reps with a string count", async () => {
    await firebase.assertFails(reps.add({ ...validAliceReps, count: "1" }));
  });

  test("alice cannot create reps without a count", async () => {
    await firebase.assertFails(
      reps.add({ user: alice.uid, timestamp: new Date() })
    );
  });

  test("alice cannot create reps without a timestamp", async () => {
    await firebase.assertFails(reps.add({ user: alice.uid, count: 1 }));
  });

  test("alice cannot create reps with a string timestamp", async () => {
    await firebase.assertFails(
      reps.add({ ...validAliceReps, timestamp: "123" })
    );
  });

  test("alice cannot create reps with a number timestamp", async () => {
    await firebase.assertFails(reps.add({ ...validAliceReps, timestamp: 123 }));
  });
});
