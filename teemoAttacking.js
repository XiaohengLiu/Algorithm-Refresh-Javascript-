var findPoisonedDuration = function(timeSeries, duration) {
    let total = 0;
    if (timeSeries.length === 0) return 0;
    for (let i = 1; i < timeSeries.length; i++) {
        if (timeSeries[i] - timeSeries[i-1] >= duration) {
            total += duration;
        } else {
            total += timeSeries[i] - timeSeries[i-1];
        }
    }
    return total+duration;
};


console.log(findPoisonedDuration([1,4,5], 2));
