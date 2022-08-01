function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    }
    else {
        alert("ERROR: You cannot divide by 0. Calculator has been cleared.")
        clearDisplay();

        return NaN;
    }
}

function operate(operator, expr1, expr2) {
    const ops = {
        "+": add,
        "-": subtract,
        "×": multiply,
        "÷": divide
    }

    // Find which function to call based on operator
    func = ops[operator]
    return func(expr1, expr2);
}

function evaluate(numStack) {
    const operator = numStack[1];
    const expr1 = numStack[0];
    const expr2 = numStack[2];

    numStack.length = 0;
    const result = operate(operator, expr1, expr2);
    numStack[0] = result.toString();

}

function clearDisplay() {
    // Clear number stack
    numStack.length = 0;

    // Clear display
    display.textContent = "";
}

function waitingForOperand() {
    return (numStack.length === 0 || numStack.length === 2);
}

function negateInput() {
    const lastNum = [num.Stack.length - 1];
    numStack[numStack.length - 1] = "-" + lastNum;
}

function updateDisplay(input) {
    display.textContent += input;
}

function updateStack(input) {
    // If there nothing on the stack, or waiting for
    // second operand
    if (waitingForOperand()) {
        numStack.push(input)
    }

    // Get last item on stack
    numStack[numStack.length - 1] += input;
}

function operatorOnStack() {
    return numStack > 1;
}



// If there are a pair of numbers and operator
// Waiting to be evaluated.
function stackIsFull() {
    return numStack.length === 3;
}

function updateOperator(operator) {
    if (operatorOnStack()) {
        numStack.push(operator);
    }
    else {
        // Replace the current operator
        numStack[1] = operator;
    }
}

var display = document.getElementById('display');
var numStack = []; // store the expressions before calculation

const numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach((btn) => {
    btn.addEventListener('click', e => {
        const number = e.target.textContent;
        updateDisplay(number);
        updateStack(number);
    });
});

const opBtns = document.querySelectorAll('.operator');
opBtns.forEach((btn) => {
    btn.addEventListener('click', e => {
        const operator = e.target.textContent;
        updateOperator(operator);
    });
});

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => evaluate(numStack));

const backspaceBtn = document.querySelector('#backspace');

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearDisplay);

const negateBtn = document.querySelector('#negate');
negateBtn.addEventListener('click', negateInput);
