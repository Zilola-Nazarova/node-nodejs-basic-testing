import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = { a: 2, b: 3, action: Action.Add };
    expect(simpleCalculator(rawInput)).toEqual(5);
  });

  test('should subtract two numbers', () => {
    const rawInput = { a: 12, b: 3, action: Action.Subtract };
    expect(simpleCalculator(rawInput)).toEqual(9);
  });

  test('should multiply two numbers', () => {
    const rawInput = { a: 2, b: 3, action: Action.Multiply };
    expect(simpleCalculator(rawInput)).toEqual(6);
  });

  test('should divide two numbers', () => {
    const rawInput = { a: 6, b: 3, action: Action.Divide };
    expect(simpleCalculator(rawInput)).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = { a: 2, b: 3, action: Action.Exponentiate };
    expect(simpleCalculator(rawInput)).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const rawInput = { a: 2, b: 3, action: '%' };
    expect(simpleCalculator(rawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = { a: 2, b: '3', action: Action.Add };
    expect(simpleCalculator(rawInput)).toBeNull();
  });
});
