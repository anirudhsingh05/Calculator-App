let buffer = '0';
let runningTotal = 0;
let previousOp = null;

let screen = document.querySelector('.answer-screen');


function buttonClick(value) {
    if(isNaN(parseInt(value)) ) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(number) {
    if(buffer === '0'){
        buffer = number;
    } else {
        buffer += number;
    }
}

function handleMath(symbol) {
    if(symbol === '0'){
        return;
    } 

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOp = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if(previousOp === '+'){
        runningTotal += intBuffer;
    } else if(previousOp === '-'){
        runningTotal -= intBuffer;
    } else if(previousOp === 'x'){
        runningTotal *= intBuffer;
    } else if(previousOp === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(buffer.length-1);
            }
            break;
        case '=':
            if(previousOp === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            // when = is clicked previous operator will be null
            previousOp = null;
            // buffer will be string and assigned buffer what was the total up till now
            buffer = "" + runningTotal;
            // after = is clicked answer is displayed and nothing is running
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function rerender() {
    screen.innerText = buffer;
}

function init() {
    document.querySelector('.buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}

init();