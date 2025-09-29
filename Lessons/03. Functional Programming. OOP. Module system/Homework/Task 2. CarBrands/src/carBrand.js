class CarBrand {
    constructor(brand, model, power, acceleration) {
        this.brand = brand;
        this.model = model;
        this.power = power;
        this.acceleration = acceleration;
    }

    runDrag(time) {
        return `${this.brand} ${this.model} runs drag for ${time} seconds`;
    }

    getWhoIsFaster(car) {
        const timeDifference = Math.abs(this.acceleration - car.acceleration);
        const fasterCar = this.acceleration < car.acceleration ? this : car;
        return `${fasterCar.brand} ${fasterCar.model} is faster for ${timeDifference} seconds`;
    }
}

export default CarBrand;