const sumSquareDifference = (num) => {
    let sumOfSquares = 0;
    let squaredSum = 0;
    for (let i = 1; i <= num; i++) {
        sumOfSquares += i ** 2;
        squaredSum += i;
    }
    return squaredSum ** 2 - sumOfSquares;
};

export default sumSquareDifference;