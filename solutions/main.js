'use strict';
let BTP = require('./binaryTreePath');
let AMS = require('./arithmeticSlice');
let LVTR = require('./largestValueInTreeRow');

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

function testLargestValueInTreeRow() {
    let root = BTP.createNode(3);
    root.left = BTP.createNode(1);
    root.right = BTP.createNode(5);
    root.left.left = BTP.createNode(5);
    root.left.right = BTP.createNode(3);
    root.right.right = BTP.createNode(9);
    console.log('testing largest value in Tree row: ');
    console.log(LVTR.largestValues(root));
}

// testBinaryTreePath();
// testArithmeticSlice();
testLargestValueInTreeRow();