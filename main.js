'use strict';
let BTP = require('./binaryTreePath');

function testBinaryTreePath() {
    let root = BTP.createNode(3);
    root.left = BTP.createNode(1);
    root.right = BTP.createNode(5);
    console.log('binary Tree Path result: ', BTP.binaryTreePaths(root));
}

testBinaryTreePath();