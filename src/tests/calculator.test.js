/**
 * calculator.test.js – Unit tests for the Node.js CLI Calculator
 *
 * Tests all four supported arithmetic operations:
 *   addition       (+)
 *   subtraction    (-)
 *   multiplication (*)
 *   division       (/)
 *
 * Also covers edge cases: division by zero, floats, negatives, unknown operators.
 * Base examples sourced from calc-basic-operations image: 2+3, 10-4, 45*2, 20/5
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

// ─── Addition ────────────────────────────────────────────────────────────────
describe('add()', () => {
  // Base example from image: 2 + 3 = 5
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));

  test('adds two positive integers', () => expect(add(10, 20)).toBe(30));
  test('adds positive and negative numbers', () => expect(add(10, -3)).toBe(7));
  test('adds two negative numbers', () => expect(add(-4, -6)).toBe(-10));
  test('adds floating-point numbers', () => expect(add(1.5, 2.5)).toBeCloseTo(4));
  test('adding zero returns the same number', () => expect(add(7, 0)).toBe(7));
  test('adds large numbers', () => expect(add(1000000, 999999)).toBe(1999999));
});

// ─── Subtraction ─────────────────────────────────────────────────────────────
describe('subtract()', () => {
  // Base example from image: 10 - 4 = 6
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));

  test('subtracts two positive integers', () => expect(subtract(50, 20)).toBe(30));
  test('result is negative when second operand is larger', () => expect(subtract(3, 10)).toBe(-7));
  test('subtracts a negative number (double negative)', () => expect(subtract(5, -5)).toBe(10));
  test('subtracts floating-point numbers', () => expect(subtract(9.9, 4.4)).toBeCloseTo(5.5));
  test('subtracting zero returns the same number', () => expect(subtract(8, 0)).toBe(8));
  test('subtracting from zero gives negative result', () => expect(subtract(0, 15)).toBe(-15));
});

// ─── Multiplication ──────────────────────────────────────────────────────────
describe('multiply()', () => {
  // Base example from image: 45 * 2 = 90
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));

  test('multiplies two positive integers', () => expect(multiply(6, 7)).toBe(42));
  test('multiplies by zero returns zero', () => expect(multiply(99, 0)).toBe(0));
  test('multiplies two negative numbers gives positive result', () => expect(multiply(-3, -4)).toBe(12));
  test('multiplies positive and negative gives negative result', () => expect(multiply(5, -3)).toBe(-15));
  test('multiplies floating-point numbers', () => expect(multiply(2.5, 4)).toBeCloseTo(10));
  test('multiplies by one returns the same number', () => expect(multiply(42, 1)).toBe(42));
  test('multiplies large numbers', () => expect(multiply(1000, 1000)).toBe(1000000));
});

// ─── Division ────────────────────────────────────────────────────────────────
describe('divide()', () => {
  // Base example from image: 20 / 5 = 4
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));

  test('divides two positive integers', () => expect(divide(144, 12)).toBe(12));
  test('divides into a float result', () => expect(divide(7, 2)).toBe(3.5));
  test('divides negative by positive gives negative result', () => expect(divide(-10, 2)).toBe(-5));
  test('divides negative by negative gives positive result', () => expect(divide(-9, -3)).toBe(3));
  test('divides zero by a number returns zero', () => expect(divide(0, 5)).toBe(0));
  test('divides floating-point numbers', () => expect(divide(1.5, 0.5)).toBeCloseTo(3));

  // Edge case: division by zero must throw
  test('throws an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws when dividing zero by zero', () => {
    expect(() => divide(0, 0)).toThrow('Division by zero is not allowed.');
  });
});

// ─── calculate() dispatcher ──────────────────────────────────────────────────
describe('calculate()', () => {
  test('dispatches addition correctly', () => expect(calculate(2, '+', 3)).toBe(5));
  test('dispatches subtraction correctly', () => expect(calculate(10, '-', 4)).toBe(6));
  test('dispatches multiplication correctly', () => expect(calculate(45, '*', 2)).toBe(90));
  test('dispatches division correctly', () => expect(calculate(20, '/', 5)).toBe(4));

  test('throws on division by zero via calculate()', () => {
    expect(() => calculate(8, '/', 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws on unknown operator', () => {
    expect(() => calculate(5, '%', 2)).toThrow('Unknown operator "%"');
  });

  test('throws on another unknown operator', () => {
    expect(() => calculate(5, '^', 2)).toThrow('Unknown operator "^"');
  });
});
