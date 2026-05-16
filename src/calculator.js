/**
 * calculator.js – Node.js CLI Calculator
 *
 * Supports four basic arithmetic operations:
 *   addition       (+)  – adds two numbers
 *   subtraction    (-)  – subtracts the second number from the first
 *   multiplication (*)  – multiplies two numbers
 *   division       (/)  – divides the first number by the second
 *
 * Usage:
 *   node src/calculator.js <number1> <operator> <number2>
 *
 * Examples:
 *   node src/calculator.js 10 + 5   →  15
 *   node src/calculator.js 10 - 3   →  7
 *   node src/calculator.js 4 * 6    →  24
 *   node src/calculator.js 20 / 4   →  5
 */

// Read arguments from the command line (skip 'node' and script path)
const args = process.argv.slice(2);

// Validate that exactly three arguments were provided
if (args.length !== 3) {
  console.error('Usage: node src/calculator.js <number1> <operator> <number2>');
  console.error('Supported operators: + - * /');
  process.exit(1);
}

const [arg1, operator, arg2] = args;

// Parse operands as floating-point numbers
const num1 = parseFloat(arg1);
const num2 = parseFloat(arg2);

// Validate that both operands are valid numbers
if (isNaN(num1) || isNaN(num2)) {
  console.error(`Error: "${isNaN(num1) ? arg1 : arg2}" is not a valid number.`);
  process.exit(1);
}

let result;

switch (operator) {
  // Addition: returns the sum of num1 and num2
  case '+':
    result = num1 + num2;
    break;

  // Subtraction: returns the difference of num1 minus num2
  case '-':
    result = num1 - num2;
    break;

  // Multiplication: returns the product of num1 and num2
  case '*':
    result = num1 * num2;
    break;

  // Division: returns the quotient of num1 divided by num2
  // Guards against division by zero
  case '/':
    if (num2 === 0) {
      console.error('Error: Division by zero is not allowed.');
      process.exit(1);
    }
    result = num1 / num2;
    break;

  default:
    console.error(`Error: Unknown operator "${operator}". Supported operators: + - * /`);
    process.exit(1);
}

console.log(`${num1} ${operator} ${num2} = ${result}`);
