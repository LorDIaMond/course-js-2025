const reverseString = (str) => {
    // Начало


    let result = "";

    for(let i =0 ; i < str.length; i++) {
        result = str.slice(i,i + 1) + result;
    }

    return result;
    // Конец
};

console.log(reverseString("elosnoc"));
export default reverseString;