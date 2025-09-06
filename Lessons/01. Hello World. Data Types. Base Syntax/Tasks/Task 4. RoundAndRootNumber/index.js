const ROUNDING_DEGREE = 100;
const roundAndRootNumber = (num) => {
    if (num < 0) return 'error';
    const root = Math.sqrt(num);
    const rounded = Math.floor(root * 100) / 100;
    return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(2);
};
export default roundAndRootNumber;
