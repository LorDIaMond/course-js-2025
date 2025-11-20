const SPECIAL_SYMBOLS = {
    coma: ',',
    dot: '.',
    space: ' ',
    semicolon: ';',
    apostrophe: "'",
};

const getSymbolForParam = (key, value) => {
    if (key === 'text') {
        return ' ' + value;
    }
    if (key in SPECIAL_SYMBOLS) {
        return SPECIAL_SYMBOLS[key];
    }

    return '';
};

const getTextFromUrl = (url) => {
    const params = new URL(url).searchParams;
    let str = params.toString();

    return str
        .replace(/text=/g, ' ')
        .replace(/coma/g, ',')
        .replace(/dot/g, '.')
        .replace(/space/g, ' ')
        .replace(/semicolon/g, ';')
        .replace(/apostrophe/g, "'")
        .replace(/&/g, '')
        .replace(/=/g, '')
        .replace(/' /g, "'");
};



export default getTextFromUrl;
