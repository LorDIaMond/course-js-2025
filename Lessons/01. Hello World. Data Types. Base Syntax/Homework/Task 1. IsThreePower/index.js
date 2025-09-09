const isThreePower = (num) => {
    // Начало

    if (num < 1 ) return false;

    let current = num;

    while (current % 3 === 0) {
        current/=3;
    }

    return current === 1;

    // Конец
};

console.log(isThreePower(81))
export default isThreePower;