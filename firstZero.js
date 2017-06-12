var firstZero = function(arr){

    helper (arr, 0, 0);

    return arr;

    function helper (arr, x, y) {
        console.log('x: ' + x + '  y: ' + y);
        if (arr[x][y] === 0) {
            return 0;
        }
        if (x === 0 && y === 0) {
            arr[x][y] = Math.min(helper(arr, x+1,y), helper(arr, x, y+1))+1;
        } else if (x === 0) {
            arr[x][y] = Math.min(helper(arr, x+1,y), Math.min(helper(arr,x,y-1),helper(arr, x, y+1)))+1;
        } else if (y === 0) {
            arr[x][y] = Math.min(helper(arr, x+1,y), Math.min(helper(arr,x-1,y),helper(arr, x, y+1)))+1;
        } else {
            arr[x][y] = Math.min(helper(arr, x+1,y), Math.min(helper(arr,x-1,y),Math.min(helper(arr,x,y-1), helper(arr, x, y+1))))+1;
        }
    }
}


let arr = [[1,1,1],[1,1,1],[1,1,0]];
firstZero(arr);