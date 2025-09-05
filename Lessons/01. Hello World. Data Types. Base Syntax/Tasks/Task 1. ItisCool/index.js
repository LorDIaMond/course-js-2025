const itisCool = (begin, end) => {
    if (begin > end) {
        return;
    }

    for(begin; begin <= end; begin += 1) {
        if (begin % 3 === 0 &&  begin % 5 === 0)
            console.log('ItisCool');
        else if (begin % 3 === 0)
            console.log('Itis');
        else if (begin % 5 === 0)
            console.log('Cool');
        else
            console.log(begin);
    }
};

export default itisCool;

// const start = 11;
// const notStart = 20;

// for(start; notStart; start += 1) {
//         if (start % 3 === 0 &&  start % 5 === 0)
//             console.log('ItisCool');
//         else if (start % 3 === 0)
//             console.log('Itisdd');
//         else if (start % 5 === 0)
//             console.log('Cool');
// }