const isThreePower = (num) => {
    if (num <= 0) {
        return false;
    }
    let a = 1;
    while (a <= num) {
        if (a === num) {
            return true;
        }
        a *= 3;
    }
    return false;
};

export default isThreePower;
