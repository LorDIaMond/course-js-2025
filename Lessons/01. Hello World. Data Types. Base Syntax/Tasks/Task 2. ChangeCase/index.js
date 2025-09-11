const changeCase = (str) => {
    let chars = str.split('');  // разбиваем строку на массив символов
    let result = '';            // будем собирать результат посимвольно

    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];

        if (char >= 'a' && char <= 'z') {
            result += char.toUpperCase();
        } else if (char >= 'A' && char <= 'Z') {
            result += char.toLowerCase();
        } else {
            result += char; // не-буквы остаются как есть
        }
    }

    return result;
};

export default changeCase;
