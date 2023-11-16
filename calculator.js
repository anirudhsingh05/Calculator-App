
let buffer = "0";
let runningTotal = 0;
let previousOp = null;
const screen = document.querySelector('.answer-screen');

function buttonClick(value) {
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(number){
    if(buffer === "0"){
        buffer = number;
    } else {
        buffer += number;
    }
}

function flushOperator(intBuffer) {
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

function handleMath(value) {
    if(buffer === 0){
        return;
    }

    const intBuffer = parseFloat(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperator(intBuffer);
    }
    previousOp = value;
    buffer = '0';
}

function handleSymbol(symbol){
    switch(symbol) {
        case 'C':
            buffer = "0";
            break;
        case '=':
            if(previousOp === null){
                return;
            }
            flushOperator(parseInt(buffer));
            previousOp = null;
            buffer = ""+runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '÷':
        case '+':
        case 'x':
        case '-':
            handleMath(symbol);
            break;
        case '.':
            buffer += '.';
            break;
    }
}

function init() {
    document.querySelector('.buttons')
    .addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    });
}

function rerender(){
    screen.innerText = buffer;
}

init();