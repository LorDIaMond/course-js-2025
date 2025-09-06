const sumSquareDifference = (num) => {
    const sumSquare = sumSquareForNumNumbers(num);
    const squareSum = squareSumForNumNumbers(num);
    return squareSum - sumSquare;
};

const sumSquareForNumNumbers = (num) => {
    if (num === 1) return 1;
    return num ** 2 + sumSquareForNumNumbers(num - 1);
};

const squareSumForNumNumbers = (num) => {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        sum += i;
    }
    return sum ** 2;
};

export default sumSquareDifference;
