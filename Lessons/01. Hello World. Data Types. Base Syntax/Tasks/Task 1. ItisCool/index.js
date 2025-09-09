const itisCool = (begin, end) => {

    while (begin <= end)
    {
        if (begin % 3 === 0 && begin % 5 === 0)  {
            console.log("ItisCool")
        }
        else if (begin % 3 === 0) {
            console.log("Itis")

        }
        else if (begin % 5 === 0) {
            console.log("Cool")

        }


        else {
            console.log(begin)
        }
        begin = begin + 1;
    }
}

itisCool(11,20);
export default itisCool;
