let operator = '';
let result = '';
let firstNum = '';
let secondNum = '';
let innerValue = null;
let firstComplete = false;

const calculatorBox = document.querySelector('.calculator-buttons');
const display = document.querySelector('.display');

// Add event listener to the calculator buttons
calculatorBox.addEventListener('click', (event) => {
    const currentClass = event.target.className;
    const currentValue = event.target.innerHTML;
    listener(currentClass, currentValue);
});

// Main event listener function
function listener(currentClass, currentValue) {
    switch (currentClass) {
        case "number":
            handleNumber(currentValue);
            break;
        case "multiplication":
        case "division":
        case "subtraction":
        case "addition":
            setOperator(currentClass);
            break;
        case "calculate":
            handleCalculation();
            break;
        case "decimal":
            addDecimal(currentValue);
            break;
        case "percent":
            applyPercent();
            break;
        case "negate":
            toggleNegate();
            break;
        case "clear":
            resetCalculator();
            break;
        case "delete":
            deleteLastDigit();
            break;
        default:
            break;
    }
}

// Handle number input
function handleNumber(value) {
    if (!firstComplete) {
        firstNum += value;
        show(firstNum);
    } else {
        secondNum += value;
        show(secondNum);
    }
}

// Set the operator
function setOperator(operatorClass) {
    switch (operatorClass) {
        case "multiplication":
            operator = '*';
            break;
        case "division":
            operator = '/';
            break;
        case "subtraction":
            operator = '-';
            break;
        case "addition":
            operator = '+';
            break;
    }
    show(operator);
    if (firstNum) {
        firstComplete = true;
    }
    if (firstNum && operator && secondNum) {
        calculate(firstNum, operator, secondNum);
        resetState();
        firstNum = result;
    }
}

// Add decimal point
function addDecimal(value) {
    innerValue = display.innerHTML;
    if (innerValue === firstNum && !firstNum.includes(value)) {
        firstNum += value;
        show(firstNum);
    } else if (innerValue === secondNum && !secondNum.includes(value)) {
        secondNum += value;
        show(secondNum);
    } else {
        show('0');
    }
}

// Apply percent calculation
function applyPercent() {
    innerValue = display.innerHTML;
    if (innerValue === firstNum) {
        firstNum = (parseFloat(firstNum) * 0.01).toString();
        show(firstNum);
    } else if (innerValue === secondNum) {
        secondNum = (parseFloat(secondNum) * 0.01).toString();
        show(secondNum);
    } else {
        show('0');
    }
}

// Toggle negate
function toggleNegate() {
    innerValue = display.innerHTML;
    if (innerValue === '0') {
        firstNum = '-' + firstNum;
        show(firstNum);
    } else if (innerValue === '-') {
        firstNum = '';
        show('0');
    } else if (innerValue === firstNum) {
        firstNum = (parseFloat(firstNum) * -1).toString();
        show(firstNum);
    } else if (innerValue === secondNum) {
        secondNum = (parseFloat(secondNum) * -1).toString();
        show(secondNum);
    } else {
        secondNum += '-';
        show(secondNum);
    }
}

// Delete last digit
function deleteLastDigit() {
    innerValue = display.innerHTML;
    if (innerValue === firstNum) {
        firstNum = firstNum.slice(0, -1);
        if (firstNum.length <= 0) {
            firstNum = '0';
        }
        show(firstNum);
    } else {
        secondNum = secondNum.slice(0, -1);
        if (secondNum.length <= 0) {
            secondNum = '0';
        }
        show(secondNum);
    }
}

// Handle calculation
function handleCalculation() {
    if (firstNum && secondNum) {
        calculate(firstNum, operator, secondNum);
        resetState();
        firstNum = result.toString();
        firstComplete = true;
    }
}

// Perform calculation
function calculate(firstNum, operator, secondNum) {
    switch (operator) {
        case '*':
            result = parseFloat(firstNum) * parseFloat(secondNum);
            break;
        case '/':
            result = parseFloat(firstNum) / parseFloat(secondNum);
            break;
        case '+':
            result = parseFloat(firstNum) + parseFloat(secondNum);
            break;
        case '-':
            result = parseFloat(firstNum) - parseFloat(secondNum);
            break;
        default:
            result = '0';
            break;
    }
    result = Math.floor(result * 10000) / 10000;
    show(result);
    return result;
}

// Reset calculator state
function resetState() {
    operator = '';
    firstNum = '';
    secondNum = '';
    firstComplete = false;
}

// Show value on display
function show(value) {
    value = value.toString();
    display.innerHTML = value;
    return value;
}

// Reset calculator
function resetCalculator() {
    resetState();
    show('0');
}
