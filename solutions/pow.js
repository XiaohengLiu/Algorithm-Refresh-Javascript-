function pow(num, round) {
    let result = 1;
    for (let i = 1; i <= round; i++) {
        result *= num;
    }
    return result
}

console.log(pow(process.argv[2],process.argv[3]));