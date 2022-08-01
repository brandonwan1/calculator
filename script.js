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
        alert("ERROR: You cannot divide by 0.");

        clearCalc();
        return NaN;
    }
}

function operate(operator, expr1, expr2) {
    const ops = {
        "+": add,
        "-": subtract,
        "×": multiply,
        "*": multiply,
        "/": divide,
        "÷": divide
    }

    // Find which function to call based on operator
    func = ops[operator]
    return func(expr1, expr2);
}

function evaluate() {
    if (!waitingForOperand() || stackIsFull()) {
        if (numStack.length !== 1) {

            const operator = numStack[1];
            const expr1 = parseFloat(numStack[0]);
            const expr2 = parseFloat(numStack[2]);

            console.log(`A: ${expr1} B: ${expr2} Operation: ${operator}`);

            let result = operate(operator, expr1, expr2);
            result = Math.round(result * 1000) / 1000;
            
            if (isNaN(result)) {
                alert("NaN Error: Calculator will be cleared.")
                clearCalc();
            }

            else {
                clearStack();
                numStack.push(result.toString());
                
                // Round the result to 3 decimal places.
                updateDisplay(result);
            }
        }
    }
    else {
        alert("Not ready to evaluate yet") 
    };
}



function negateNum() {
    // Ensure calculator in a state to be able to negate input
    if (numStack.length === 1 || stackIsFull()) {
        negated = numStack[numStack.length - 1] * -1;

        // If a number is negated, it will be converted to a Number
        // Convert number back into a string
        numStack[numStack.length - 1] = negated.toString();
        updateDisplay(negated);
    }
}

function backspace() {
    if (!waitingForOperand()) {
        numAsString = numStack[numStack.length - 1];
        trimmedNum = numAsString.slice(0, -1);

        numStack[numStack.length - 1] = trimmedNum;
        updateDisplay(trimmedNum);
    }
}

function addDecimal() {
    console.log("decimal")

    lastNumOnStack = numStack[numStack.length - 1];

    if (waitingForOperand() || !lastNumOnStack.includes(".")) {
        appendToDisplay(".");
        updateStack(".");
    }
    }

function clearCalc() {
    clearDisplay();
    clearStack();
}

function clearDisplay() {
    // Clear display
    display.textContent = "";
}

function clearStack() {
     // Clear number stack
     numStack.length = 0;
}

function waitingForOperand() {
    return (numStack.length === 0 || numStack.length === 2);
}

function appendToDisplay(input) {
    if (waitingForOperand()) {
        clearDisplay();
    }

    display.textContent += input;
}

function updateDisplay(input) {
    display.textContent = input;
}


function updateStack(input) {
    // If there nothing on the stack, or waiting for
    // second operand
    if (waitingForOperand()) {
        numStack.push(input)
    }

    else {
        // Get last item on stack
        numStack[numStack.length - 1] += input;
    }
}

function operatorOnStack() {
    return numStack > 1;
}


// If there are a pair of numbers and operator
// Waiting to be evaluated.
function stackIsFull() {
    return numStack.length === 3;
}

function stackIsEmpty() {
    return numStack.length === 0;
}

function isOperator(input) {
    const operators = new Set(["-", "+", "+", "/"]);

    console.log("operator test");
    return operators.has(input);

}

function updateOperator(operator) {
    if (stackIsEmpty() || numStack[0] === "") {
        alert("Oops. Need a number first.")
    }
    else {
        if (stackIsFull()) {
            // Evaluate current stack first
            evaluate();
        }

        numStack[1] = operator;
    }
}

var display = document.getElementById('display');
var numStack = []; // store the expressions before calculation

const numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach((btn) => {
    btn.addEventListener('click', e => {
        const number = e.target.textContent;
        appendToDisplay(number);
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
equalsBtn.addEventListener('click', evaluate);

const backspaceBtn = document.querySelector('#backspace');
backspaceBtn.addEventListener('click', backspace);

const decimalBtn = document.querySelector('#decimal-btn');
decimalBtn.addEventListener('click', addDecimal);

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearCalc);

const negateBtn = document.querySelector('#negate');
negateBtn.addEventListener('click', negateNum);

document.addEventListener('keydown', function(event) {
    if(parseInt(event.key)) {
        appendToDisplay(event.key);
        updateStack(event.key);
    }
    else if(event.key === ".") {
        addDecimal();
    }
    else if(event.key === "Backspace") {
        backspace();
    }
    else if(event.key === "=" || event.key === "Enter") {
        evaluate();
    }
    else if (event.key.toUpperCase() === "C") {
        clearCalc();
    }
    else if(isOperator(event.key)) {
        updateOperator(event.key);
    }
});
