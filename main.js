/* CALCULATOR APP*/

//to-do: fix fractions eg. 0.1 + 0.2 = 0.30000000000000004

// 1.Definitions
//
// This app uses 4 main variables for storing input and performing operations:
// "firstNumber" & "secondNumber" - to perform operations on
// "operator" - to know what operation to perform
// "resultValue" - the result of combining operator with "firstNumber" & "secondNumber"
//
// 2.How it works
//
// Numbers are stored as strings. Only "resultValue" uses float.
// "firstNumber" is always present and displayed to the user. By default it is "0". The rest is undefined.
// Clicking on digits changes "firstNumber". 
// Clicking on digits changes "secondNumber" if an "operator" is present.
// "operator" can be set/changed at any time.
// To remove operator user has to click "C" (function clear()). This button sets all variables back to initial state.
// Clicking "=" button resolves operation. Doing so again repeats last operation with previous result as firstnumber.

let resultHTML = document.getElementById("result");
let operationHTML = document.getElementById("performedOperation");

var firstNumber = "0";
var secondNumber = undefined;
var operator = undefined
var resultValue = undefined;

function clear() {
    firstNumber = "0";
    secondNumber = undefined;
    operator = undefined
    resultValue = undefined;
    resultHTML.textContent = 0;
    operationHTML.textContent = "0";
}

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function compute(firstNumber, secondNumber, operator) {

    let result = 5;

    switch (operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
    }

    return result //.toFixed(2);
}

function numEndsWithDot(number) {
    return number.indexOf(".") === number.length - 1; //bool
}

function removeDot(number) {
    return number.slice(0, -1);
}


/* obsolete(?) concepts */

/*  
function handleResult(resultValue) {
    //let max X characters
    resultValue = resultValue.toString();
    let result = resultValue;
    let maxChar = 15;

    if (resultValue.length > maxChar) {
        result = resultValue.slice(0, maxChar);
    }

    return result;
}
*/


/*
//changes first or second number dependent if operator is present
function firstOrSecond(clickedButton) {
    if (operator) {
        !secondNumber ? secondNumber = clickedButton : secondNumber += clickedButton;
    } else if (!operator) {
        !firstNumber ? firstNumber = clickedButton : firstNumber += clickedButton;
    }
}
*/




document.getElementsByClassName("button-wrapper")[0].addEventListener('click', function() {
    let clickedButton = event.target.textContent;

    if (clickedButton.length === 1) { //only process single button click
        switch (clickedButton) {
            default:
                if (operator) {
                    !secondNumber || secondNumber == "0" ? secondNumber = clickedButton : secondNumber += clickedButton;
                    break;
                } else if (!operator) {
                    !firstNumber || firstNumber == "0" ? firstNumber = clickedButton : firstNumber += clickedButton;
                    break;
                }
                break;

            case ".":
                if (operator) {
                    if (secondNumber.indexOf(".") > -1) break;
                    !secondNumber ? secondNumber = clickedButton : secondNumber += clickedButton;
                    break;
                } else if (!operator) {
                    console.log("no operator");
                    if (firstNumber.indexOf(".") > -1) break;
                    !firstNumber ? firstNumber = clickedButton : firstNumber += clickedButton;
                    break;
                }

            case "0":
                if (!!operator) {
                    if (!secondNumber || secondNumber == 0) {
                        secondNumber = "0";
                        break;
                    } else {
                        //console.log("doesnt equal");
                        secondNumber += clickedButton
                        break;
                    }
                } else {
                    if (!firstNumber || firstNumber == 0) {
                        //console.log("it is undefined");
                        firstNumber = "0";
                        break;
                    } else {
                        //console.log("first doesnt equal");
                        firstNumber += clickedButton;
                        break;
                    }
                }


            case "+":
            case "-":
            case "*":
            case "/":
                if (numEndsWithDot(firstNumber)) firstNumber = removeDot(firstNumber);
                if (resultValue) {
                    firstNumber = resultValue;
                    secondNumber = undefined;
                    //resultValue = 0;
                   // resultHTML.textContent = resultValue;
                }

                operator = clickedButton;
                break;
                
            case "=":
                console.log(firstNumber);
                console.log(secondNumber);
                console.log(operator);
                // if at least one component is missing don't do anything
                if (operator === undefined || firstNumber === undefined || secondNumber === undefined) break;

                //trim secondNumber if neccessary
                if (secondNumber) {
                    if (numEndsWithDot(secondNumber)) secondNumber = removeDot(secondNumber);
                }

                // if there is some result already, do previous computation again on the result
                if (!!resultValue) {
                    firstNumber = resultValue;
                }
                // actual result
                resultValue = compute(parseFloat(firstNumber), parseFloat(secondNumber), operator);
                resultHTML.textContent = resultValue;
                break;
            
            case "C":
                clear();
                break;

        }
    }
    operationHTML.textContent = `${firstNumber ? firstNumber : 0}${operator ? operator + (secondNumber === undefined ? "" : secondNumber) : ""}`;

    //console.log("result is " + resultValue);
    //console.log("first number is " + firstNumber);
    //console.log("second number is " + secondNumber);
    //console.log("operator is " + operator);
});




