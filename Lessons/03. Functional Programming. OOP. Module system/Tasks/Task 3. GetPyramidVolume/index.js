class Pyramid {
    constructor(h, s1, s2) {
        this.h = h;
        this.s1 = s1;
        this.s2 = s2;
    }

    getVolume() {
        const volume = (this.height / 3) * (
            this.baseArea1 + this.baseArea2 + Math.sqrt(this.baseArea1 * this.baseArea2)
        );
        return volume;
    }
}

export default Pyramid;
