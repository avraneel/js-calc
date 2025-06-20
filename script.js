"use strict";

const arithOperationSet = ["+", "-", "*", "/"];
const operationSet = ["+", "-", "*", "/", "C", "="];

const numButtonList = document.querySelectorAll(".num-button");
const opButtonList = document.querySelectorAll(".op-button");
const display = document.querySelector(".display");

let operation = "";
let numBuffer = "";
let numArray = [];

// adding listener for each num buttons
for (const numButton of numButtonList) {
    numButton.addEventListener("click", () => {
        const num = numButton.textContent;
        display.textContent += num;
        numBuffer += num;
        console.log(numArray);
    });
}

// adding listener for each operation button
for(const opButton of opButtonList) {
    opButton.addEventListener("click", function () {
        const op = opButton.textContent;

        /* When we press an operation button, store the current numeric buffer
           into the array and reset the numeric buffer to 0 */
        if(numBuffer != "") {
            numArray.push(parseInt(numBuffer));
            numBuffer = "";
        }

        console.log(numArray);

        if(arithOperationSet.includes(op)) {

            /* We press an arithmetic button second time when we already have
               an existing operation */
            if(numArray.length == 2) {
                let result = evalulate(); 
                if(result == "ERROR") {
                    clearScreen();
                    return;
                }
                else {
                    display.textContent = result;
                    numArray.push(result);
                } 
            }

            display.textContent += " " + op + " ";
            operation = op;
            
        }
        else if(op === "C") {
            clearScreen();
        }
        else if(op === "=") {
            let result = evalulate();
            if(result == "ERROR") {
                clearScreen();
                return;
            }
            else {
                display.textContent = result
                numBuffer = result.toString();
                console.log(numArray);
            }
        }
    });
}

function clearScreen() {
    numArray = [];
    numBuffer = "";
    display.textContent = " ";
}

function evalulate() {
    let result = NaN;

    switch (operation) {
        case "+":
            result = numArray.shift() + numArray.shift();
            break;
        case "-":
            result = numArray.shift() - numArray.shift();
            break;
        case "*":
            result = numArray.shift() * numArray.shift();
            break;
        case "/":
            let num1 = numArray.shift();
            let num2 = numArray.shift();
            console.log(num2);
            if(num2 == 0) {
                alert("Cannot divide by 0");
                return "ERROR";
            }
            else {
                result = num1 / num2;
            }
            break;
        default:
            display.textContent = numBuffer;
            break;
    }
    return result;
}

