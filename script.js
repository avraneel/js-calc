"use strict";

const numButtonList = document.querySelectorAll(".num-button");
let num1 = 0;

for (const numButton of numButtonList) {
    numButton.addEventListener("click", () => {
        const num = numButton.textContent;
        setNum(num);
    });
}

function setNum(num) {
    const display = document.querySelector(".display");
    num1 = num;
    display.textContent = num;
}