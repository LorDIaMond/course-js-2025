class Pyramid {
    constructor(h, s1, s2) {
        this.h = h;
        this.s1 = s1;
        this.s2 = s2;
    }

    getVolume() {
        const volume = (this.h / 3) * (
            this.s1 + this.s2 + Math.sqrt(this.s1 * this.s2)
        );
        return volume;
    }
}

export default Pyramid;
