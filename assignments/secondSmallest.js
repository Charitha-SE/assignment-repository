

let num = [2,6,9,11,76,55];
num.sort((a,b) => a-b);
console.log(num);
console.log(num[1]);

function secondSamallest(arr){
    arr.sort((a,b) => a-b);  
    return arr[1];
};

console.log(secondSamallest(num));



