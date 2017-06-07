'use strict';
let BTP = require('./binaryTreePath');
let AMS = require('./arithmeticSlice');

function testBinaryTreePath() {
    let root = BTP.createNode(3);
    root.left = BTP.createNode(1);
    root.right = BTP.createNode(5);
    console.log('binary Tree Path result: ', BTP.binaryTreePaths(root));
}

function testArithmeticSlice() {
    console.log('testing Arithmetic Slice:');
    console.log(AMS.numberOfArithmeticSlices([1,2,3,4]));
    console.log(AMS.numberOfArithmeticSlices([1,2,3,4,7,8,9]));
}

// testBinaryTreePath();
testArithmeticSlice();