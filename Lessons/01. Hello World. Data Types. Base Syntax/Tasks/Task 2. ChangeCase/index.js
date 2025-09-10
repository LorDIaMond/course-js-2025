const changeCase = (str) => {
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (char >= 'a' && char <= 'z') {
            result += char.toUpperCase();
        } else if (char >= 'A' && char <= 'Z') {
            result += char.toLowerCase();
        } else {
            result += char;
        }
    }
};

export default changeCase;
