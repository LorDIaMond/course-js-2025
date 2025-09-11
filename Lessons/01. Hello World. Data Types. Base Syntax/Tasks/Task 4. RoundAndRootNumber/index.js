// степень округления числа
const ROUNDING_DEGREE = 100;

const roundAndRootNumber = (num) => {
    if (num < 0) {
        return "error";
    }

    let sqrt = Math.sqrt(num);
    let rounded = Math.floor(sqrt * ROUNDING_DEGREE) / ROUNDING_DEGREE;

    return rounded.toFixed(2);
};

export default roundAndRootNumber;
