import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 12, b: 3, action: Action.Subtract, expected: 9 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: '%', expected: null },
  { a: 2, b: '3', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should perform action(%s) on a(%i) and b(%i) to equal expected(%i)`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
