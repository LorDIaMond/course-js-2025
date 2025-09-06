const reverseString = (str) => {
    //Версия поворота строки через цикл
    //
    // let result = '';
    // for (let i = str.length - 1; i >= 0; i--) {
    //     result += str[i];
    // }
    // return result;
// };
    let strLen = str.length;
    if (strLen <= 1) {
        return str;
    }
    let rightIndex = strLen - 1;
    let res = '';
    if (rightIndex === 1) {
        res = str[1] + str[0];
        return res;
    }
    if (rightIndex === 2) {
        res = str[2] + str[1] + str[0];
        return res;
    }
    return reverseString(str.slice(Math.floor(rightIndex / 2), rightIndex + 1)) +
            reverseString(str.slice(0, Math.floor(rightIndex / 2)));
};

export default reverseString;