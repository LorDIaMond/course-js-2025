const isThreePower = (num) => {
    if (typeof num !== 'number') {
        throw new TypeError('Аргумент должен быть числом');
    }

    if (num <= 0) {
        return false;
    }
    if (num === 1) {
        return true;
    }
    let current = num;
    while (current % 3 === 0) {
        current /= 3;
    }
    return current === 1;
};

export default isThreePower;
