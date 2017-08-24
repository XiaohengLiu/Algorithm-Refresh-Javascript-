//original question: https://leetcode.com/problems/arithmetic-slices/#/description
module.exports = {
    numberOfArithmeticSlices(A) {
        if (A.length < 3) return 0;
        let result = 0;
        let first = A[0];
        let second = A[1];
        let curGap = A[1]-A[0];
        let curLength = 2;
        for (let i = 2; i < A.length; i++) {
            let cur = A[i];
            if ((cur - second) === curGap) {    //continue adding
                curLength++;
                first = second;
                second = cur;
            } else {                            //current value not follow the rule
                if(curLength >= 3) {            //start add total to the result, and continue the next round
                    result += aggregateTotal(curLength);
                }
                curGap = cur - second;
                first = second;
                second = cur;
                curLength = 2;
            }
        }

        if (curLength >= 3) {
            result += aggregateTotal(curLength);
        }
        return result;

        function aggregateTotal(length) {
            let total = 0
            for (let i = 1; i <= length - 2; i++) {
                total += i;
            }
            return total;
        }
    },
}

// console.log(numberOfArithmeticSlices([1,2,3,4,7,8,9]));