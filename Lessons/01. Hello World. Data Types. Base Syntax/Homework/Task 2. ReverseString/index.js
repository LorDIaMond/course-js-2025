const reverseString = (str) => {
    if (typeof str !== 'string') {
        throw new TypeError('Аргумент должен быть строкой');
    }

    const len = str.length;

    if (str.length <= 1) {
        return str;
    }

    return reverseString(str.slice(1, len)) + str[0];
};

export default reverseString;
