const sumSquareDifference = (num) => {
    // Начало
    let sum = 0;
    let sumSquare = 0;

    for (let i = 1; i <= num; i++) {
        sum += i;
        sumSquare += i * i
    }

    const squareSum = sum * sum;
    return Math.abs(squareSum - sumSquare);
    // Конец
};

console.log(sumSquareDifference(10))
export default sumSquareDifference;