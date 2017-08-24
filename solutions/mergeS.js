// function mergeS(arr) {
//
//     if (arr.length <= 1) {
//         return arr;
//     }
//
//     let mid = Math.floor(arr.length/2);
//     arr = merge(mergeS(arr.slice(0, mid)), mergeS(arr.slice(mid, arr.length)));
//
//     function merge(arr1, arr2) {
//         let index1 = 0, index2 = 0;
//         let result = [];
//         while(index1 < arr1.length && index2 < arr2.length) {
//             if (arr1[index1] < arr2[index2]) {
//                 result.push(arr1[index1++]);
//             } else {
//                 result.push(arr2[index2++]);
//             }
//         }
//
//         while(index1 < arr1.length) {
//             result.push(arr1[index1++]);
//         }
//
//         while(index2 < arr2.length) {
//             result.push(arr2[index2++]);
//         }
//
//         return result;
//     }
//
//     return arr;
// }


function quickSort(items, left, right) {

    if (items.length > 1) {
        let index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;

    function partition(items, left, right) {

        let pivot   = items[Math.floor((right + left) / 2)];
        let i       = left;
        let j       = right;

        while (i <= j) {

            while (items[i] < pivot) {
                i++;
            }

            while (items[j] > pivot) {
                j--;
            }

            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }

        return i;
    }

    function swap(items, firstIndex, secondIndex){
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    }

}





let arr = [2,1,4,3,1,7,11,23,11,5,6,7,8,9];

console.log(quickSort(arr, 0, arr.length-1));