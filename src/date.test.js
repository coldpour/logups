import { paddedDay, day, year, month, monthWord, paddedMonth } from "./date";

const createDateWith = (fn) => (n) => {
  const d = new Date();
  fn(d, n);
  return d;
};

const testDay = createDateWith((d, n) => d.setDate(n));
const testMonth = createDateWith((d, n) => d.setMonth(n));
const testYear = createDateWith((d, n) => d.setYear(n));

[
  [year, [[testYear(2020), 2020]]],
  [
    month,
    [
      [testMonth(5), 6],
      [testMonth(11), 12],
    ],
  ],
  [monthWord, [[testMonth(5), "June"]]],
  [paddedMonth, [[testMonth(5), "06"]]],
  [day, [[testDay(5), 5]]],
  [paddedDay, [[testDay(5), "05"]]],
].forEach(([subject, cases]) => {
  cases.forEach(([arg, expected]) => {
    describe(subject.name, () => {
      test(`returns ${expected}, given ${arg.toString()}`, () =>
        expect(subject(arg)).toEqual(expected));
    });
  });
});
