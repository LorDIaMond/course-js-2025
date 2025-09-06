const itisCool = (begin, end) => {
    for (let i = begin; i <= end; i++) {
        console.log(
            (i % 3 === 0 && i % 5 === 0) ? 'ItisCool' :
                (i % 3 === 0) ? 'Itis' :
                    (i % 5 === 0) ? 'Cool' :
                        i
        );
    }
};
export default itisCool;
