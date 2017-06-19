// Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.
// You may assume the given string consists of lowercase English letters only and its length will not exceed 10000.
//
// Example 1:
// Input: "abab"
// Output: True
// Explanation: It's the substring "ab" twice.

// Example 2:
// Input: "aba"
// Output: False

// Example 3:
// Input: "abcabcabcabc"
// Output: True
// Explanation: It's the substring "abc" four times. (And the substring "abcabc" twice.)

var repeatedSubstringPattern = function(s) {
    for (let i = 1; i <= s.length/2; i++) {
        if (s.length%i !== 0) continue;
        let pattern = s.substring(0,i);
        let start = i;
        let end = i*2;
        while(end <= s.length) {
            if (s.substring(start, end) === pattern) {
                if (end === s.length) return true;
                start += i;
                end += i;
            } else {
                break;
            }
        }
    }
    return false;
};

let str = "ababab";

console.log(repeatedSubstringPattern(str));