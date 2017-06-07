function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
};

module.exports = {
    createNode(val) {
        return new TreeNode(val);
    },

    binaryTreePaths (root) {
        let result = [];
        if (!root) return result;
        helper(root, root.val.toString());
        return result;

        function helper(node, path) {
            if (!node.left && !node.right) {
                result.push(path)
            }
            if (node.left) {
                helper(node.left, path+'->'+node.left.val);
            }
            if (node.right) {
                helper(node.right, path+'->'+node.right.val);
            }
        }
    }
}