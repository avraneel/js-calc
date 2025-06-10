"use strict";

const numButtonList = document.querySelectorAll(".num-button");
let numstring = "";

// adding listener for each num buttons
for (const numButton of numButtonList) {
    numButton.addEventListener("click", () => {
        const num = numButton.textContent;
        setNum(num);
    });
}

function setNum(num) {
    const display = document.querySelector(".display");
    /* if we press multiple buttons, then it will build a string and then 
        display it */
    numstring += num;
    display.textContent = numstring;
}