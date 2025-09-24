const changeCase = (str) => {
    const chars = str.split('');
    let result = '';

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        if (char >= 'a' && char <= 'z') {
            result += char.toUpperCase();
        } else if (char >= 'A' && char <= 'Z') {
            result += char.toLowerCase();
        } else {
            result += char;
        }
    }

    return result;
};

export default changeCase;
