const isTicketHappy = (numStr) => {
    const len = numStr.length;
    const half = len / 2;

    let sumFirst = 0;
    let sumSecond = 0;

    for (let i = 0; i < half; i++) {
        sumFirst += Number(numStr[i]);
    }

    for (let i = half; i < len; i++) {
        sumSecond += Number(numStr[i]);
    }

    return sumFirst === sumSecond;
};

export default isTicketHappy;
