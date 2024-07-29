function mergeArray(arr1, arr2){
    let arr =[];

    for (let i=0; i<arr1.length; i++){
        arr.push(arr1[i]);
        arr.push(arr2[i]);
    }
    return arr;
}
let arr1 = [1,3,5]
let arr2 = [2,4,6]
console.log(mergeArray(arr1,arr2));


