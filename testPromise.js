function getUserId(index) {
    return new Promise(function(resolve) {

        console.log('creating promise');
        setTimeout(function() {
            resolve({message: 'resolved message' + index});
        }, 2000);
    })
}

let promiseQueue = [];
for (let i = 0; i < 5; i++) {
    promiseQueue.push(getUserId(i));
}

Promise.all(promiseQueue).then(function(data) {
    console.log('promise all data: ', data);
});