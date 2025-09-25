function isThreePower(num) {
    if (typeof num !== 'number') {
        throw new TypeError('Аргумент должен быть числом');
    }

    while (num >= 3) {
        num /= 3;
    }
    if (num === 1) {
        return true;
    }
    return false;
}

const result = isThreePower(27);
console.log(result ? "Является степенью тройки" : "Не является степенью тройки");