const sumSquareDifference = (num) => {
    // Начало
    let sumSquare = 0;
    let squareSum = 0;
    for (let i = 1; i <= num; i++) {
        sumSquare += i*i;
        squareSum += i;
    };
    return squareSum * squareSum - sumSquare;
    // Конец
};

export default sumSquareDifference;