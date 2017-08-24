function findInteger(num) {

    let result = helper(num);
    let remain = result.remain;
    let currentSum = result.sum;

    while(remain !== 1) {
        let tempResult = helper(remain);
        console.log('temp result: ', tempResult);
        remain = tempResult.remain;
        currentSum += tempResult.sum;
        if (remain === 0)
            return currentSum
    }

    return currentSum+1;
}

function helper(num) {
    //calculate the the number of power 2
    let count = 0;
    let temp = num;
    while (Math.floor(temp/2) > 0) {
        count++;
        num = Math.floor(temp/2);
    }
    if (Math.pow(2,count) === num) {count--};

    //use fibonacci value to get the sum of
    let preOne = 1;
    let preTwo = 1;
    let sum = 2;
    for (let i = 0; i <= count; i++) {
        let current = preOne + preTwo;
        sum += current;
        preOne = preTwo;
        preTwo = current;
    }

    let remain = num - Math.pow(2,count);
    return {sum: sum, remain: remain};
}

console.log(findInteger(8));