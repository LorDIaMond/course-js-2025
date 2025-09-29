import CarBrand from './carBrand';

class BugattiBrand extends CarBrand {
    constructor(model, power, acceleration, price) {
        super('Bugatti', model, power, acceleration);
        this.price = price;
    }

    getIsExpensive() {
        return this.price > 1;
    }
}

export default BugattiBrand;