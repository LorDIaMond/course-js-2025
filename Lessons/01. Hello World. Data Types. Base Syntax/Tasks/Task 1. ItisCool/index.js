const itisCool = (begin, end) => {
    if (begin > end) return;

    for (let i = begin; i <= end; i++) {
        if (i % 15 === 0) console.log("ItisCool");
        else if (i % 5 === 0) console.log("Cool");
        else if (i % 3 === 0) console.log("Itis");
        else console.log(i);
    }
}

export default itisCool;
