const isThreePower = (num) => {
    let result = true;
    if (num < 1) {
        result = false;
    } else {
        while (num !== 1) {
            if (num % 3 !== 0) {
                result = false;
                break;
            } else {
                num /= 3;
            }
        }
    }
    return result;
};

export default isThreePower;