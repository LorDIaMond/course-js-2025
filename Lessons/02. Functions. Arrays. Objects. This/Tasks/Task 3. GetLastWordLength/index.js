const getLastWordLength = (str) => {
    const trimmedStr = str.trim();

    if (trimmedStr.length === 0) {
        return 0;
    }

    const words = trimmedStr.split(/\s+/);

    const lastWord = words[words.length - 1];
    return lastWord.length;
};

export default getLastWordLength;
