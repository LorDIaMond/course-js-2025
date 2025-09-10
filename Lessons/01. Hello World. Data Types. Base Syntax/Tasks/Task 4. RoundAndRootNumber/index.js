// степень округления числа
const ROUNDING_DEGREE = 100;

const roundAndRootNumber = (num) => {
    if (num < 0) {
        return 'error';
    }
    
    const sqrt = Math.sqrt(num);
    const rounded = Math.floor(sqrt * 100) / 100;
    return rounded.toString();;
};

export default roundAndRootNumber;
