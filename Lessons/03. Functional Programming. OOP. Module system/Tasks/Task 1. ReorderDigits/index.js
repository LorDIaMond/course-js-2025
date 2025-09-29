const reorderDigits = (type, ...numbers) => {
    if (type === 'asc') {
        return numbers.sort((a, b) => a - b);
    }
    if (type === 'desc') {
        return numbers.sort((a, b) => b - a);
    }
    throw Error('Че то неправильно ввели');
};

export default reorderDigits;
