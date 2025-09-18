const getBoomerangsCount = (numbers) => {
    let count = 0;

    for (let i = 0; i < numbers.length - 2; i++) {
        const triplet = numbers.slice(i, i + 3);

        if (triplet[0] === triplet[2] && triplet[0] !== triplet[1]) {
            count++;
        }
    }

    return count;
};

export default getBoomerangsCount;