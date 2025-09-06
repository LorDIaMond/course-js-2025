const isTicketHappy = (numStr) => {
    let result = 0;
    for (let i = 0; i < numStr.length / 2; i++) {
        result += parseInt(numStr[i], 10)
        result -= parseInt(numStr[numStr.length - 1 - i], 10);
    }
    return result === 0;
};

export default isTicketHappy;
