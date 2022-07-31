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
    return (b !== 0) ? (a/b) : "Error: Divide by 0"
}

function operate(operator, a, b) {
    const ops = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide
    }

    // Find which function to call based on operator
    func = ops[operator]
    return func(a, b);
}