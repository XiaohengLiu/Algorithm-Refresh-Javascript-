// Think about Zuma Game. You have a row of balls on the table, colored red(R), yellow(Y), blue(B), green(G), and white(W). You also have several balls in your hand.
//
//     Each time, you may choose a ball in your hand, and insert it into the row (including the leftmost place and rightmost place). Then, if there is a group of 3 or more balls in the same color touching, remove these balls. Keep doing this until no more balls can be removed.
//
//     Find the minimal balls you have to insert to remove all the balls on the table. If you cannot remove all the balls, output -1.
//
// Examples:
//
//     Input: "WRRBBW", "RB"
// Output: -1
// Explanation: WRRBBW -> WRR[R]BBW -> WBBW -> WBB[B]W -> WW
//
// Input: "WWRRBBWW", "WRBRW"
// Output: 2
// Explanation: WWRRBBWW -> WWRR[R]BBWW -> WWBBWW -> WWBB[B]WW -> WWWW -> empty
//
// Input:"G", "GGGGG"
// Output: 2
// Explanation: G -> G[G] -> GG[G] -> empty
//
// Input: "RBYYBBRRB", "YRBGB"
// Output: 3
// Explanation: RBYYBBRRB -> RBYY[Y]BBRRB -> RBBBRRB -> RRRB -> B -> B[B] -> BB[B] -> empty

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
var findMinStep = function(board, hand) {
    let result = Number.MAX_VALUE;
    helper(board, hand, 1);
    return result !== Number.MAX_VALUE ? result : -1;

    function helper(board, hand, steps) {
        for (let i = 0; i < hand.length; i++) {
            console.log('board: ' + board + ', hand: ' + hand + ', steps: ' + steps);
            for (let j = 0; j < board.length; j++) {

                let current = board.slice(); //copy current string
                current = current.slice(0,j) + hand[i] + current.slice(j, current.length) // insert hand[i] to the j position
                current = dismiss(current);     //reduce the length if possible
                if (current.length === 0) {
                    result = Math.min(steps, result)
                } else {
                    let handCopy = hand.slice(0,i) + hand.slice(i+1);
                    let currentCopy = current.slice();
                    helper(currentCopy, handCopy, steps+1);
                }

            }
        }
    }
};

function dismiss(str) {
    for (let i = 0; i < str.length-2; i++) {
        if (str[i] === str[i+1] && str[i] === str[i+2]) {
            let index = i+1;
            while(index < str.length) {
                if (str[index] === str[index+2]) {
                    index++;
                } else {
                    break;
                }
            }

            str = str.slice(0, i) + str.slice(index+2, str.length);
            let arrCopy = str.slice();
            return dismiss(arrCopy);
        }
    }
    return str;
}


let a = 'WWRRBBWW';
let b = 'WRBRW';
console.log('result is: ', findMinStep(a,b));