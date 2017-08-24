function findRec(arr) {
    if (!(arr && arr[0])) return false;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            let buffer = genEmptyBuffer(arr);
            if(helper(arr, 0, 0, '', buffer)) {
                return true;
            }
        }
    }

    return false;
}

//arr is still the original array, prev is the previous direction it goes, so it cannot go back
function helper (arr, i, j, deny, buffer) {

    if (buffer[i][j] === 1) { //point has been accessed, which means the rectangle has been generated
        return true;
    }

    buffer[i][j] = 1;

    if (i === 0 && j === 0) { //cannot go up and left
        if (arr[i+1][j] === 1 && deny != 'right') {
            helper(arr, i+1, j, 'left', buffer);
        }
        if (arr[i][j+1] === 1 && deny != 'down') {
            helper(arr, i, j+1, 'up', buffer);
        }
    } else if (i === 0) { //cannot go up

    } else if (j === 0) {  //cannot go left

    } else if (i === arr.length - 1) { //cannot go down

    } else if (i === arr[0].length - 1) { //cannot go right

    } else {  //any direction

    }
}

function genEmptyBuffer(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result[i] = Array.from(Array(arr[0].length), () => {
            return 0;
        })
    }
    return result;
}