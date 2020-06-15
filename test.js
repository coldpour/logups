const fs = require("fs");
const path = require("path");
const firebase = require("@firebase/testing");

const projectId = "coldpour-test-project";

const alice = { uid: "alice", email: "alice@example.com" };
const bob = { uid: "bob", email: "bob@example.com" };

const validAliceReps = {
  count: 20,
  user: alice.uid,
  timestamp: new Date(),
};

const validBobReps = {
  count: 13,
  user: bob.uid,
  timestamp: new Date(),
};

const bobsFirstReps = "bobsFirst";

beforeAll(async () => {
  const rulesContent = fs.readFileSync(
    path.resolve(__dirname, "firestore.rules"),
    "utf8"
  );
  await firebase.loadFirestoreRules({
    projectId,
    rules: rulesContent,
  });
  const adminReps = firebase
    .initializeAdminApp({
      projectId,
    })
    .firestore()
    .collection("reps");
  await adminReps.doc(bobsFirstReps).set(validBobReps);
});

afterAll(() => {
  firebase.apps().forEach((app) => app.delete());
});

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

describe("when logged in as bob", () => {
  const bobReps = firebase
    .initializeTestApp({
      projectId,
      auth: bob,
    })
    .firestore()
    .collection("reps");

  test("bob can read his existing reps", async () => {
    await firebase.assertSucceeds(bobReps.doc(bobsFirstReps).get());
  });
});

describe("when logged in as alice", () => {
  const aLiceDb = firebase
    .initializeTestApp({
      projectId,
      auth: alice,
    })
    .firestore();
  const aliceReps = aLiceDb.collection("reps");

  test("alice can CRUD reps for herself", async () => {
    await firebase.assertSucceeds(aliceReps.add(validAliceReps));
    const snapshot = await aliceReps.where("user", "==", alice.uid).get();
    const { docs } = snapshot;
    expect(docs.length).toBeGreaterThan(0);
    const [first] = docs;
    const { id } = first;
    const { count } = first.data();
    const newCount = count * 2;
    await firebase.assertSucceeds(
      aliceReps.doc(id).update({ count: newCount })
    );
    const updatedDoc = await aliceReps.doc(id).get();
    expect(updatedDoc.data().count).toEqual(newCount);
    await firebase.assertSucceeds(aliceReps.doc(id).delete());
  });

  test("alice cannot read bob's existing reps", async () => {
    await firebase.assertFails(aliceReps.doc(bobsFirstReps).get());
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
      await firebase.assertFails(aliceReps.add(arg)));
  });
});
