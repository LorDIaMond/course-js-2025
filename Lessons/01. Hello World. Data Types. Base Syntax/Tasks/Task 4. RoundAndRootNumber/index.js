// степень округления числа
const ROUNDING_DEGREE = 100;

const roundAndRootNumber = (num) => {
    if (num < 0) return 'error';

    let temp = Math.floor(Math.sqrt(num) * ROUNDING_DEGREE) / ROUNDING_DEGREE;
    console.log(temp.toString());
    return temp.toString();
};

export default roundAndRootNumber;
