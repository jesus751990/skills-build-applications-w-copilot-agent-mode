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

// Addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of a minus b
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of a divided by b
// Throws an error if b is zero to prevent division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Evaluates an expression given two numeric operands and an operator string (+, -, *, /)
function calculate(num1, operator, num2) {
  switch (operator) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
    default:
      throw new Error(`Unknown operator "${operator}". Supported operators: + - * /`);
  }
}

module.exports = { add, subtract, multiply, divide, calculate };

// Run as CLI only when executed directly (not required as a module)
if (require.main === module) {
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

  try {
    const result = calculate(num1, operator, num2);
    console.log(`${num1} ${operator} ${num2} = ${result}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
