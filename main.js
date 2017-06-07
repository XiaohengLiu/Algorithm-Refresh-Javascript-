'use strict';
let BTP = require('./binaryTreePath');

function testBinaryTreePath() {
    let root = BTP.createNode(3);
    root.left = BTP.createNode(1);
    root.right = BTP.createNode(5);
    console.log(BTP.binaryTreePaths(root));
}

testBinaryTreePath();