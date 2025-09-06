const isTicketHappy = (numStr) => {
    if (numStr.length % 2 !== 0) return false;

    const middle = numStr.length / 2;
    let firstSum = 0;
    let secondSum = 0;

    for (let i = 0; i < numStr.length; i++) {
        if (i < middle) { firstSum += parseInt(numStr[i]); }
        else { secondSum += parseInt(numStr[i]); }
    }

    console.log(firstSum === secondSum);
    return firstSum === secondSum;
};

export default isTicketHappy;
