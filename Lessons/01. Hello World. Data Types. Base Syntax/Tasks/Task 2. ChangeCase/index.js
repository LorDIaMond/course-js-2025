const changeCase = (str) => {
    let result = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === char.toLowerCase()) { result += char.toUpperCase(); }
        else { result += char.toLowerCase(); }
    }

    console.log(result);
    return result;
};

export default changeCase;
