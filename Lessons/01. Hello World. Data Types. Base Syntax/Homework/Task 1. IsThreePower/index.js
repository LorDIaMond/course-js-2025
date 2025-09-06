const isThreePower = (num) => {
    if (num < 1) return false; // степень тройки - натуральное число, больше или равно 1
    while (num % 3 === 0) {
        num /= 3;
    }
    return num === 1;
};

export default isThreePower;
