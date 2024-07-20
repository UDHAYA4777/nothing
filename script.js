let display = document.getElementById('display');
let currentInput = '0';
let operator = '';
let previousInput = '';

// keyboard control
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        CalculateNumber(key);
    }
    
    
    if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    }

    
    if (key === 'Enter' || key === '=') {
        calculateResult();
    }

    
    if (key === 'Backspace') {
        backspace();
    }

    
    if (key === 'Escape') {
        deleteDisplay();
    }
});


function CalculateNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculateResult() {
    if (currentInput === '' || previousInput === '') return;
    let result;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            result = previous / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function deleteDisplay() {
    currentInput = '0';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    display.textContent = `${previousInput} ${operator} ${currentInput}`.trim();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}
