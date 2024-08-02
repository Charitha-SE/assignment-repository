let numberArray = [98,76,32,100,45,1,6,11];
let maxNum = 0;
let minNum = numberArray[0];
function largestDiff(arr){

for (let i=0; i<numberArray.length; i++){
    if (maxNum<numberArray[i])
        maxNum=numberArray[i];
    if (minNum>numberArray[i])
        minNum=numberArray[i];
}
return maxNum-minNum;
}
console.log(largestDiff(numberArray));

//Inbuilt method

console.log("The largest difference is: " + (Math.max(...numberArray) - Math.min(...numberArray)));