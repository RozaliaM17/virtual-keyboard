const mainContainer = document.querySelector(".main-container");
const keyboard = document.querySelector(".keyboard-container");
const keyboardLine = document.querySelectorAll(".keyboard-grid");
const textarea = document.querySelector(".output-container");
textarea.addEventListener("focus", showKeyboard);

const letters = document.querySelectorAll(".letter-button");
for (var i = 0; i < letters.length; i++) {
    letters[i].addEventListener("click", writeLetter);
}

const symbols = document.querySelectorAll(".symbol-button");
for (var i = 0; i < symbols.length; i++) {
    symbols[i].addEventListener("click", writeSymbol);
}

const functions = document.querySelectorAll(".function-button");
for (var i = 0; i < functions.length; i++) {
    functions[i].addEventListener("click", executeFunction);
}

function showKeyboard() {
    if (keyboard.classList.contains("hide")) {
        keyboard.classList.remove("hide");
        mainContainer.classList.remove("hidden-keyboard");
    }
}


// write letter
function writeLetter(event) {
    let characterButton = event.target;
    let character = event.target.innerText;
    textarea.value += character;
    character = "";
    textarea.focus();
    disabledButtons();
}

//  write symbol
function writeSymbol (event) {
    let symbol = event.target.innerText;
    textarea.value += symbol;
    symbol = "";
    textarea.focus();
    disabledButtons();
}

// Execute choosen function
function executeFunction(event) {
    let choosenFunction = event.target.closest(".function-button");
    let functionId = choosenFunction.id;

    if (functionId === "backspace") {
        textarea.value = (textarea.value).slice(0, -1);
        textarea.focus();
        disabledButtons();
    } 
    if (functionId === "caps") {
        event.target.classList.toggle("active");
        textarea.focus();
        disabledButtons();
        for (var i = 0; i < letters.length; i++) {
            letters[i].classList.toggle("changeCase");
        }
    }

    if (functionId === "space") {
        textarea.value += " ";
        textarea.focus();
        disabledButtons();
    }

    if (functionId === "enter") {
        textarea.value +=  `\n`;
        textarea.focus();
        disabledButtons();
    }

    if (functionId === "hide") {
        keyboard.classList.add("hide");
        mainContainer.classList.add("hidden-keyboard");

    }
}

// Disable the keyboard 
function disabledButtons() {
    for (var i = 0; i < keyboardLine.length; i++) {
        keyboardLine[i].classList.add("disabled");
    }
    for (var i = 0; i < letters.length; i++) {
        letters[i].disabled = true;
    }
    for (var i = 0; i < symbols.length; i++) {
        symbols[i].disabled = true;
    }
    for (var i = 0; i < functions.length; i++) {
        functions[i].disabled = true;
    }

    setTimeout(function() {
    for (var i = 0; i < keyboardLine.length; i++) {
        keyboardLine[i].classList.remove("disabled");
    }
    for (var i = 0; i < letters.length; i++) {
        letters[i].disabled = false;
    }
    for (var i = 0; i < symbols.length; i++) {
        symbols[i].disabled = false;
    }
    for (var i = 0; i < functions.length; i++) {
        functions[i].disabled = false;
    }

    }, 500);
};
