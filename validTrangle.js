// Given an array consists of non-negative integers, your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.
//
//     Example 1:
// Input: [2,2,3,4]
// Output: 3
// Explanation:
//     Valid combinations are:
//     2,3,4 (using the first 2)
//     2,3,4 (using the second 2)
//     2,2,3
// Note:
//     The length of the given array won't exceed 1000.
// The integers in the given array are in the range of [0, 1000].


/* Need an O(n^2) solution */
var triangleNumber = function(nums) {
    let count = 0;
    nums.sort((a,b) => {
        return b-a;
    });
    if (nums.length < 3) return 0;
    for (let i = 0; i < nums.length - 2; i++) {
        let start = i+1;
        let end = nums.length-1;
        while(start <= end) {
            if (nums[start] + nums[end] >nums[i]) {
                count += end-start;
                start++;
            } else {
                end--;
            }
        }
    }
    return count;
};


let arr = [24,3,82,22,35,84,19];
// let arr = [2,1,4,3]
console.log(triangleNumber(arr));