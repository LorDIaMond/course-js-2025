const isTicketHappy = (numStr) => {
    let sum = 0;
    for(let i = 0; i < numStr.length/2 - 1; i++){
        sum = numStr[i] - numStr[numStr.length - i - 1];
    }
    return !sum;
};

export default isTicketHappy;
