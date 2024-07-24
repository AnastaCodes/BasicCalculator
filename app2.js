const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let calculated = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['-', '+', '/', '×'];

// Add event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerHTML;
        handleOperation(value);
    });
});

// Main operation handler
function handleOperation(value) {
    switch (value) {
        case '+/-':
            toggleSign();
            break;
        case 'C':
            clearAll();
            break;
        case '⌫':
            deleteDigit();
            break;
        case '%':
            applyPercent();
            break;
        case '=':
            performCalculation();
            break;
        default:
            if (operators.includes(value)) {
                setOperator(value);
            } else if (digits.includes(value)) {
                appendDigit(value);
            }
            break;
    }
}

// Clear all values and display
function clearAll() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    calculated = false;
    updateDisplay('0');
}

// Update display
function updateDisplay(value) {
    display.innerHTML = value;
}

// Toggle sign of the number
function toggleSign() {
    if (!operators.includes(display.innerHTML)) {
        let currentValue = display.innerHTML;
        currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue;
        updateDisplay(currentValue);
        updateCurrentNumber(currentValue);
    }
}

// Apply percent calculation
function applyPercent() {
    let currentValue = (parseFloat(display.innerHTML) / 100).toString();
    updateDisplay(currentValue);
    updateCurrentNumber(currentValue);
}

// Update current number based on operator
function updateCurrentNumber(newNumber) {
    if (operator === '') {
        firstNumber = newNumber;
    } else {
        secondNumber = newNumber;
    }
}

// Append digit to the current number
function appendDigit(value) {
    if (calculated) {
        clearAll();
        firstNumber = value;
        updateDisplay(firstNumber);
        return;
    }
    if (value === '.' && display.innerHTML.includes('.')) {
        return;
    }
    if (secondNumber === '' && operator === '') {
        firstNumber += value;
        updateDisplay(firstNumber);
    } else {
        secondNumber += value;
        updateDisplay(secondNumber);
    }
}

// Set the operator
function setOperator(value) {
    operator = value;
    updateDisplay(value);
}

// Perform the calculation
function performCalculation() {
    if (secondNumber === '') {
        secondNumber = firstNumber;
    }
    switch (operator) {
        case '+':
            firstNumber = (+firstNumber) + (+secondNumber);
            break;
        case '-':
            firstNumber = (+firstNumber) - (+secondNumber);
            break;
        case '×':
            firstNumber = (+firstNumber) * (+secondNumber);
            break;
        case '/':
            if (+secondNumber === 0) {
                clearAll();
                return;
            }
            firstNumber = (+firstNumber) / (+secondNumber);
            break;
    }
    calculated = true;
    updateDisplay(firstNumber);
}

// Delete the last digit
function deleteDigit() {
    let currentValue = display.innerHTML;
    if (calculated) {
        return;
    }
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay(currentValue);
    updateCurrentNumber(currentValue);
}
