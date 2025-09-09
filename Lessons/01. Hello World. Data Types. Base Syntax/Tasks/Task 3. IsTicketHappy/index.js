const isTicketHappy = (numStr) => {

    if (numStr.length % 2===0) {
        let left = 0;
        let right = 0;
            for (let i = 0; i < numStr.length;i ++){
                let char = Number(numStr[i]);
                if (i < numStr.length / 2) {
                    left += char;
                }
                else {
                    right += char;
                }
            }
            return left===right;
    }
};

isTicketHappy("386926")
isTicketHappy("211003")
isTicketHappy("1552")
isTicketHappy("044503")


isTicketHappy("00")
export default isTicketHappy;
