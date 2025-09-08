const isTicketHappy = (numStr) => {
    let countFirstHalf = 0;
    let countSecondHalf = 0;
    for (let i = 0; i < numStr.length / 2; i++) {
        countFirstHalf += +numStr[i];
        countSecondHalf += +numStr[numStr.length - i -1];
    }
    return countFirstHalf === countSecondHalf;
};

export default isTicketHappy;
