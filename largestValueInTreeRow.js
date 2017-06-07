//original question: https://leetcode.com/problems/find-largest-value-in-each-tree-row/#/description

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
};

module.exports = {
    largestValues(root) {
        let result = [];
        let curRow = [];
        let nextRow = [];
        let curLargest = -Number.MAX_VALUE;
        if (!root) return [];
        curRow.push(root);
        while (curRow.length > 0) {
            let node = curRow.pop();
            curLargest = (curLargest > node.val ? curLargest : node.val);
            if (node.left) {
                nextRow.push(node.left);
            }
            if (node.right) {
                nextRow.push(node.right)
            }
            if (curRow.length === 0) {
                result.push(curLargest);
                curLargest = -Number.MAX_VALUE;
                curRow = nextRow;
                nextRow = [];
            }
        }
        return result;
    },
}