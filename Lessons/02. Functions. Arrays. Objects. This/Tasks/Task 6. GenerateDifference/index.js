

const generateDifference = (obj1, obj2) => {
    const result = {};

    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (const key of allKeys) {
        const hasInObj1 = key in obj1;
        const hasInObj2 = key in obj2;

        if (hasInObj1 && hasInObj2) {

            if (obj1[key] === obj2[key]) {
                result[key] = 'unchanged';
            } else {
                result[key] = 'changed';
            }
        } else if (hasInObj1 && !hasInObj2) {
            result[key] = 'deleted';
        } else if (!hasInObj1 && hasInObj2) {
            result[key] = 'added';
        }
    }

    return result;
};

export default generateDifference;
