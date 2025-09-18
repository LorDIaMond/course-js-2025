const convertToBinary = num => (num >>> 0).toString(2);

const getHammingWeight = (num) => {
    const binaryString = convertToBinary(num);

    let count = 0;
    for (let i = 0; i < binaryString.length; i++) {
        if (binaryString[i] === '1') {
            count++;
        }
    }

    return count;
};

export default getHammingWeight;
