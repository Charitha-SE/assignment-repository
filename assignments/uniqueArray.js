function removeDuplicates(arr) {
    let uniqueSet = new Set(arr);
    return Array.from(uniqueSet);
}

let numbers = [1, 2, 2, 3, 4, 4, 5, 6, 6, 7];
console.log(removeDuplicates(numbers));



