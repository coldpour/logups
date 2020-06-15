const fs = require("fs");
const path = require("path");
const firebase = require("@firebase/testing");

const projectId = "coldpour-test-project";

const alice = { uid: "alice", email: "alice@example.com" };
const bob = { uid: "bob", email: "bob@example.com" };

const badData = [
  ["for no user", ({ count, timestamp }) => ({ count, timestamp })],
  ["without a count", ({ user, timestamp }) => ({ user, timestamp })],
  ["with a negative count", (o) => ({ ...o, count: -20 })],
  ["with a string count", (o) => ({ ...o, count: "1" })],
  ["with a bool count", (o) => ({ ...o, count: true })],
  ["with an object count", (o) => ({ ...o, count: { a: 1 } })],
  ["with an array count", (o) => ({ ...o, count: [1] })],
  ["without timestamp", ({ user, count }) => ({ user, count })],
  ["with a string timestamp", (o) => ({ ...o, timestamp: "123" })],
  ["with a number timestamp", (o) => ({ ...o, timestamp: 123 })],
  ["with a bool timestamp", (o) => ({ ...o, timestamp: true })],
  ["with an array timestamp", (o) => ({ ...o, timestamp: [1] })],
  [
    "with an object timestamp",
    (o) => ({ ...o, timestamp: { milis: 123, nanos: 293487 } }),
  ],
];

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
const alicesFirstReps = "alicesFirst";

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
  await adminReps.doc(alicesFirstReps).set(validAliceReps);
});

afterAll(() => {
  firebase.apps().forEach((app) => app.delete());
});

describe("when not logged in", () => {
  const unauthedReps = firebase
    .initializeTestApp({
      projectId,
    })
    .firestore()
    .collection("reps");

  test("cannot create reps", async () => {
    await firebase.assertFails(unauthedReps.add(validAliceReps));
  });

  test("cannot read bob's existing reps", async () => {
    await firebase.assertFails(unauthedReps.doc(bobsFirstReps).get());
  });

  test("cannot update bob's existing reps", async () => {
    await firebase.assertFails(
      unauthedReps.doc(bobsFirstReps).set(validAliceReps)
    );
  });

  test("cannot delete bob's existing reps", async () => {
    await firebase.assertFails(unauthedReps.doc(bobsFirstReps).delete());
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

  describe("alice cannot CRUD for bob", () => {
    test("create", async () => {
      await firebase.assertFails(aliceReps.add(validBobReps));
    });

    test("read", async () => {
      await firebase.assertFails(aliceReps.doc(bobsFirstReps).get());
    });

    test("update", async () => {
      await firebase.assertFails(
        aliceReps.doc(bobsFirstReps).set(validBobReps)
      );
    });

    test("delete", async () => {
      await firebase.assertFails(aliceReps.doc(bobsFirstReps).delete());
    });
  });

  describe("alice cannot create reps with bum data", () => {
    badData.forEach(([desc, argFn]) => {
      const arg = argFn(validAliceReps);
      test(`${desc}: ${JSON.stringify(arg)}`, async () =>
        await firebase.assertFails(aliceReps.add(arg)));
    });
  });

  describe("alice cannot update reps with whack data", () => {
    badData.forEach(([desc, argFn]) => {
      const arg = argFn(validAliceReps);
      test(`${desc}: ${JSON.stringify(arg)}`, async () =>
        await firebase.assertFails(aliceReps.doc(alicesFirstReps).set(arg)));
    });
  });
});
