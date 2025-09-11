const isThreePower = (num) => {
    if (typeof num !== 'number') {
        throw new TypeError('Аргумент должен быть числом');
    }

    while (num >= 3) {
        num /= 3;
    }
    return num === 1;

};

export default isThreePower;
