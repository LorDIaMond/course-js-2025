const moreFunction = (number) => {
    return (numbersArray) => {
        return numbersArray.map(elem => elem / number);
    };
};

export default moreFunction;