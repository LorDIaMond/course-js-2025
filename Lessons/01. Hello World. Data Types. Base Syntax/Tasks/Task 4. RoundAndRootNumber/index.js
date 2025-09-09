// степень округления числа
const ROUNDING_DEGREE = 100;

const roundAndRootNumber = (num) => {
    if (num < 0 ) {
        return "error";
    }

    const sqrt = Math.sqrt(num);
    let result = (Math.floor(sqrt*ROUNDING_DEGREE)/ROUNDING_DEGREE).toString();


    console.log(result);
    return result;
};

roundAndRootNumber(5843)
export default roundAndRootNumber;
