import getIsFirstArrayCooler from './index';

describe('09.c.2 getIsFirstArrayCooler', () => {
    it('c.9.2.1 — first array length not equals to second array length', () => {
        expect(getIsFirstArrayCooler([1, 2], [1, 2, 3])).toBe(false);
        expect(getIsFirstArrayCooler([1], [1, 2])).toBe(false);
        expect(getIsFirstArrayCooler([1, 2, 3], [1])).toBe(false);
    });

    it('c.9.2.2 — the first array is cooler than second', () => {
        expect(getIsFirstArrayCooler([5, 6, 7], [1, 2, 3])).toBe(true);
        expect(getIsFirstArrayCooler([3, 1, 4], [2, 2, 3])).toBe(true); // 3>2, 1<2, 4>3 → 2 > 1
    });

    it('c.9.2.3 — the second array is cooler than first', () => {
        expect(getIsFirstArrayCooler([1, 2, 3], [5, 6, 7])).toBe(false);
        expect(getIsFirstArrayCooler([2, 1, 3], [3, 2, 4])).toBe(false); // 2<3, 1<2, 3<4 → 0 > 3? нет
    });

    it('c.9.2.4 — both arrays have equal count won position', () => {
        expect(getIsFirstArrayCooler([5, 1], [1, 5])).toBe(false); // 1 выигрыш у каждого
        expect(getIsFirstArrayCooler([3, 2, 1], [1, 2, 3])).toBe(false); // 1 vs 1
    });

    it('c.9.2.5 — arrays dont have numbers', () => {
        expect(getIsFirstArrayCooler([], [])).toBe(false); // 0 выигрышей → не больше → false
    });

    it('c.9.2.6 — arrays have negative numbers', () => {
        expect(getIsFirstArrayCooler([-1, -2], [-3, -4])).toBe(true); // -1 > -3, -2 > -4 → 2 > 0
        expect(getIsFirstArrayCooler([-5, 0], [-1, -10])).toBe(false); // -5 < -1, 0 > -10 → 1 vs 1 → false
    });
});
