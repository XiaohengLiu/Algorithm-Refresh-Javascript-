/*
 Given a binary tree, determine if it is height-balanced.

 For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

 Subscribe to see which companies asked this question.
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
};

var isBalanced = function(root) {

    return getHeight(root) != -1;

    function getHeight(node) {
        if (node === null)  return 0;

        let left = getHeight(node.left);
        if (left === -1)    return -1;
        let right = getHeight(node.right);
        if (right === -1)    return -1;

        if (Math.abs(left - right) > 1) return -1;
        return Math.max(left,right) + 1;
    }
};

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(3);
root.right.left = new TreeNode(3);
root.right.right = new TreeNode(3);
root.left.left.left = new TreeNode(4);

console.log(isBalanced(root));


