function reverse(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Аргумент должен быть строкой');
    }

    const len = str.length;

    if (str.length <= 1) {
        return str;
    }

    return reverse(str.slice(1, len)) + str[0];
}

console.log(reverse("Java Script"));