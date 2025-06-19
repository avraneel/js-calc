"use strict";

const arithOperationSet = ["+", "-", "*", "/"];

let operation = "";
let numBuffer = "";
let numArray = [];

// adding listener for each num buttons
const numButtonList = document.querySelectorAll(".num-button");

for (const numButton of numButtonList) {
    numButton.addEventListener("click", () => {
        const num = numButton.textContent;
        displayNumOnScreen(num);
        numBuffer += num;
    });
}

function displayNumOnScreen(num) {
    const display = document.querySelector(".display");
    /* if we press multiple buttons, then it will build a string and then 
        display it */
    display.textContent += num;
}

const opButtonList = document.querySelectorAll(".op-button");

// adding listener for each operation button
for(const opButton of opButtonList) {
    opButton.addEventListener("click", function () {
        const op = opButton.textContent;

        /* When we press an operation button, store the current numeric buffer
           into the array and reset the numeric buffer to 0 */
        numArray.push(parseInt(numBuffer));
        numBuffer = "";

        if(arithOperationSet.includes(op)) {
            // Operation is one of the 4 arithmetic operations
            displayOperationOnScreen(op);
            operation = op;
        }
        else if(op === "C") {
            clearScreen();
            for(let num of numArray) {
                console.log(num);
            }
        }
        else if(op === "=") {
            evalulate();
        }
    });
}

function displayOperationOnScreen(op) {
    const display = document.querySelector(".display");
    display.textContent += " " + op + " ";
}

function clearScreen() {
    const display = document.querySelector(".display");
    numArray = [];
    numBuffer = "";
    display.textContent = " ";
}

for(let num of numArray) {
    console.log(num);
}

function evalulate() {
    let result = NaN;
    const display = document.querySelector(".display");

    switch (operation) {
        case "+":
            result = numArray.shift() + numArray.shift();
            display.textContent = result;
            console.log("add"); 
            break;
        case "-":
            result = numArray.shift() - numArray.shift();
            display.textContent = result;
            console.log("subtract");
            break;
        case "*":
            result = numArray.shift() * numArray.shift();
            display.textContent = result;
            console.log("multiply");
            break;
        case "/":
            let num1 = numArray.shift();
            let num2 = numArray.shift();
            console.log(num2);
            if(num2 == 0) {
                display.textContent = "Cannot divide by 0"
            }
            else {
                result = num1 / num2;
                display.textContent = result;
            }
            console.log("divide");
            break;
        default:
            break;
    }
}

