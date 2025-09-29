import CarBrand from './carBrand';

class LadaBrand extends CarBrand {
    constructor(model, power, acceleration, location) {
        super('Lada', model, power, acceleration);
        this.location = location;
    }

    getLocation() {
        return `${this.brand} ${this.model} is located in ${this.location}`;
    }
}

export default LadaBrand;