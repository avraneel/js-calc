"use strict";

const arithOperationSet = ["+", "-", "*", "/"];

let operation = "";
let numBuffer = "";
let numMemory = [];

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
        numMemory.push(parseInt(numBuffer));
        numBuffer = "";

        if(arithOperationSet.includes(op)) {
            // Operation is one of the 4 arithmetic operations

            /* We press an arithmetic button second time when we already have
               an existing operation */
            
            if(numMemory.length == 2) {
                let temp = evalulate();
                const display = document.querySelector(".display");
                display.textContent = temp;
                numMemory.push(temp);
            }
            displayOperationOnScreen(op);
            operation = op;
            
        }
        else if(op === "C") {
            clearScreen();
            for(let num of numMemory) {
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
    numMemory = [];
    numBuffer = "";
    display.textContent = " ";
}

for(let num of numMemory) {
    console.log(num);
}

function evalulate() {
    let result = NaN;
    const display = document.querySelector(".display");

    switch (operation) {
        case "+":
            result = numMemory.shift() + numMemory.shift();
            display.textContent = result;
            console.log("add"); 
            break;
        case "-":
            result = numMemory.shift() - numMemory.shift();
            display.textContent = result;
            console.log("subtract");
            break;
        case "*":
            result = numMemory.shift() * numMemory.shift();
            display.textContent = result;
            console.log("multiply");
            break;
        case "/":
            let num1 = numMemory.shift();
            let num2 = numMemory.shift();
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
    return result;
}

