"use strict";

let operation = "";
const arithOperationSet = ["+", "-", "*", "/"];

// adding listener for each num buttons
const numButtonList = document.querySelectorAll(".num-button");
let numstring = "";

for (const numButton of numButtonList) {
    numButton.addEventListener("click", () => {
        const num = numButton.textContent;
        displayNumOnScreen(num);
    });
}

function displayNumOnScreen(num) {
    const display = document.querySelector(".display");
    /* if we press multiple buttons, then it will build a string and then 
        display it */
    //numstring += num;
    display.textContent += num;
}

const opButtonList = document.querySelectorAll(".op-button");

// adding listener for each operation button
for(const opButton of opButtonList) {
    opButton.addEventListener("click", function () {
        const op = opButton.textContent;
        if(arithOperationSet.includes(op)) {
            // Operation is one of the 4 arithmetic operations
            console.log("arithmetic op found");
            displayOperationOnScreen(op);
            operation = op;
        }
        else if(op === "C") {
            clearScreen();
        }
        else if(op === "=") {
            evalulate();
        }
        console.log(op);
    });
}

function displayOperationOnScreen(op) {
    const display = document.querySelector(".display");
    display.textContent += " " + op;
}

function clearScreen() {
    const display = document.querySelector(".display");
    display.textContent = " ";
}

function evalulate() {
    switch (operation) {
    case "+":
        console.log("add"); 
        break;
    case "-":
        break;
    case "*":
        break;
    case "/":
        break;
    case "C":
        clearScreen();
        break;
    }
}

