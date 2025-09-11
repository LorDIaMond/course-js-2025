const sumSquareDifference = (num) => {
    if (typeof num !== 'number') {
        throw new TypeError('Аргумент должен быть числом');
    }

    let sum1 = 0;
    let sum2 = 0;

    for (let i = 1; i < num+1; i++) {
        sum1 += i**2;
        sum2 += i;
    }
    sum2 **= 2;

    return sum2 - sum1;
};

export default sumSquareDifference;