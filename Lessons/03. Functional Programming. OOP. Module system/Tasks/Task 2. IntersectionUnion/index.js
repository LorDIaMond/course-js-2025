const getIntersectionUnion = (arrOne, arrTwo) => {
    const intersection = [];
    const union = [];

    function contains(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return true;
            }
        }
        return false;
    }

    for (let i = 0; i < arrOne.length; i++) {
        const current = arrOne[i];
        if (contains(arrTwo, current) && !contains(intersection, current)) {
            intersection.push(current);
        }
    }

    for (let i = 0; i < arrOne.length; i++) {
        if (!contains(union, arrOne[i])) {
            union.push(arrOne[i]);
        }
    }

    for (let i = 0; i < arrTwo.length; i++) {
        if (!contains(union, arrTwo[i])) {
            union.push(arrTwo[i]);
        }
    }

    return {
        intersection, union };
};

export default getIntersectionUnion;
