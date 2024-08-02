const prompt = require('prompt-sync')();

function uniqueArray(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (!result.includes(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}

let input = prompt("Enter numbers separated by commas: ");
let numbers = input.split(',').map(num => num.trim());
numbers = numbers.map(Number);
console.log("Unique numbers:", uniqueArray(numbers));