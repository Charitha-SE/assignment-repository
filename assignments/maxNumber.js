function maxNumber(arr){
    let maxNum = 0;
    // let minNum = arr[0];
    
    for (let i=0; i<arr.length; i++){
        if (maxNum<arr[i])
            maxNum=arr[i];
        // if (minNum>arr[i])
        //     minNum=numberArray[i];
    }  
    return maxNum;
    // return minNum;
}

let numberArray = [98,76,32,100,45,1,6,11];

console.log(maxNumber(numberArray));
// console.log(minNumber(numberArray));



// inbuilt method

console.log(Math.max(...numberArray));