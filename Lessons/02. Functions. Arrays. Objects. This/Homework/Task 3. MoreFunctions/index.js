const moreFunction = (number) => {
    return (numbersArray) => {
        return numbersArray.map(func => func / number);
    };
};

export default moreFunction;