const changeCase  = (str) => {
    let newString = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== str[i].toUpperCase()) {
            newString += str[i].toUpperCase();
        } else {
            newString += str[i].toLowerCase();
        }
    }
    return newString;
}

export default changeCase;