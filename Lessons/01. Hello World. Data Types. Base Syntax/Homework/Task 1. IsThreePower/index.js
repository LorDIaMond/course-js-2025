const isThreePower = (num) => {
    if (num < 1) return false;

    while (num % 3 === 0) { num = num / 3}

    console.log(num === 1);
    return num === 1;
};

export default isThreePower;