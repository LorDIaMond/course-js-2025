const isTicketHappy = (numStr) => {
    let digits = ticket.split('');
    let length = digits.length;

    if (length % 2 !== 0) {
        return false;
    }

    let half = length / 2;
    let sumFirstHalf = 0;
    let sumSecondHalf = 0;


    for (let i = 0; i < half; i++) {
        sumFirstHalf += parseInt(digits[i], 10);
    }

    for (let i = half; i < length; i++) {
        sumSecondHalf += parseInt(digits[i], 10);
    }

    return sumFirstHalf === sumSecondHalf;
};

export default isTicketHappy;
