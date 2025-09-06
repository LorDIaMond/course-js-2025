const reverseString = (str) => {
    console.log(str.charAt(str.length - 1));
    if (str.length <= 1) return str;
    return str[str.length - 1] + reverseString(str.slice(0, -1));
};

export default reverseString;