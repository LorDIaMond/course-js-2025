// степень округления числа
const ROUNDING_DEGREE = 100;

const roundAndRootNumber = (num) => {
    if (num < 0){
        return 'error'
    }
    let result = String(Math.floor(String(Math.sqrt(num)) * 100) / 100);
    return result;
};

export default roundAndRootNumber;
