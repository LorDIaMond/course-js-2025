const sumSquareDifference = (num) => {
    const sum = num * (num + 1) / 2;
    const squareOfSum = sum * sum;
    const sumOfSquares = num * (num + 1) * (2 * num + 1) / 6;

    console.log(squareOfSum - sumOfSquares);
    return squareOfSum - sumOfSquares;
};

export default sumSquareDifference;