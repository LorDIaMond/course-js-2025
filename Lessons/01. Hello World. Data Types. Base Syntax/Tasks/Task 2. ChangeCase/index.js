const changeCase = (str) => {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toLowerCase()) {
            newStr += str[i].toUpperCase();
        } else if (str[i] === str[i].toUpperCase()) {
            newStr += str[i].toLowerCase();
        } else {
            newStr += str[i];
        }
    }
    return newStr;
};

export default changeCase;
