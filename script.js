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
let isPreviousEquals = false;

// adding listener for each num buttons
for (const numButton of numButtonList) {
    numButton.addEventListener("click", () => {
        if(display.textContent.length > maxLength) {
            alert("Out of Bounds");
            clearScreen();
            return;
        }

        if(isPreviousEquals) {
            clearScreen();
            isPreviousEquals = false;
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

        if(display.textContent === "") {
            return;
        }


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

            /* If we press consecutive op buttons then the
                display will update with the latest op button pressed */
            if(duplicateOpFlag) {
                let copyString = display.textContent;
                console.log(copyString);
                let newString = copyString.slice(0,-2) + op + " ";
                console.log(newString)
                display.textContent = newString;
            }
            else {
                display.textContent += " " + op + " ";
            }
            duplicateOpFlag = true;
            isPreviousEquals = false;
        }
        else if(op === "C") {
            clearScreen();
        }
        else if(op === "=") {
            /* If we press consecutive op buttons and the last button
               is = then the display will update with just the number */ 
            if(duplicateOpFlag || numArray.length == 1) {
                operation = op;

                /* Pressing = will only display the number so we can make
                   the flag false */
                duplicateOpFlag = false;
            }
            let result = evalulate();
            if(result == "ERROR") {
                clearScreen();
                return;
            }
            else {
                display.textContent = result;
                numBuffer = result.toString();
                console.log(numBuffer);
            }
            isPreviousEquals = true;
        }
    });
}

function clearScreen() {
    numArray = [];
    numBuffer = "";
    display.textContent = "";
    duplicateOpFlag = false;
    isPreviousEquals = false;
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
                result = Math.floor(num1 / num2);
            }
            break;
        default:
            result = numArray.shift();
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

