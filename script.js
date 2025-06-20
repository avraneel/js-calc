"use strict";

const arithOperationSet = ["+", "-", "*", "/"];
const maxLength = 20;

const numButtonList = document.querySelectorAll(".num-button");
const opButtonList = document.querySelectorAll(".op-button");
const display = document.querySelector(".display");

let operation = "";
let numBuffer = "";
let numArray = [];

let duplicateOpFlag = false;

// adding listener for each num buttons
for (const numButton of numButtonList) {
    numButton.addEventListener("click", () => {
        if(display.textContent.length > maxLength) {
            alert("Out of Bounds");
            clearScreen();
            return;
        }
        const num = numButton.textContent;
        numBuffer += num;
        display.textContent += num;
        duplicateOpFlag = false;
    });
}

// adding listener for each operation button
for(const opButton of opButtonList) {
    opButton.addEventListener("click", function () {

        if(display.textContent.length >= maxLength) {
            alert("Out of Bounds");
            clearScreen();
            return;
        }

        const op = opButton.textContent;

        /* When we press an operation button, store the current numeric buffer
           into the array and reset the numeric buffer to 0 */
        if(numBuffer != "") {
            numArray.push(parseInt(numBuffer));
            numBuffer = "";
        }

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

            operation = op;

            if(duplicateOpFlag) {

                /* If we press consecutive op buttons then the
                display will update with the latest op button pressed */
                let copyString = display.textContent;
                console.log(copyString);
                let newString = copyString.slice(0,-2) + op + " ";
                console.log(newString)
                display.textContent = newString;
            }
            else {
                display.textContent += " " + op + " ";
            }
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
                display.textContent = result;
                numBuffer = result.toString();
                console.log(numArray);
            }
        }
        duplicateOpFlag = true;
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
    if(result.toString().length > maxLength) {
        alert("Out of bounds");
        return "ERROR";
    }
    else {
        return result;
    }
}

