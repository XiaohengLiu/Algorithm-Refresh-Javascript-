/* Description:
*   find the left most node of the last level of the binary tree
*
*  Solution:
*    Use BFS
* */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
};


var leftMostLowest = function(root) {
    if (!root) {
        return null;
    }
    let queue = [];
    let nextQueue = [];
    let copy = [];
    queue.push(root);
    while(queue.length > 0) {
        let current = queue.shift();
        copy.push(current.val);
        if (current.left) {
            nextQueue.push(current.left);
        }
        if (current.right) {
            nextQueue.push(current.right);
        }
        if (queue.length === 0) {
            if (nextQueue.length > 0) {
                queue = nextQueue;
                nextQueue = [];
                copy = [];
            } else {
                return copy[0];
            }
        }
    }
    return null;
}

let root = new TreeNode(3);
root.left = new TreeNode(2);
root.right = new TreeNode(5);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(9);

console.log(leftMostLowest(root));