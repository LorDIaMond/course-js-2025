const isThreePower = (num) => {
    if (num <= 0) {
        return false;
    }
    let a = 1
    while(a < num){
        a *= 3
        if (a === num){
            return true
        }
        return false
    }
};

export default isThreePower;