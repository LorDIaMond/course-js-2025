import helloWorld from './index.js';

const sinon = require('sinon');

describe('01.c.0 helloWorld', () => {
    let spy;

    beforeEach(() => {
        spy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        spy.restore();
    });

    it('01.c.0.1 hello', () => {
        helloWorld();
        const actual = spy.args.join('\n');
        expect(actual).toBe('Hello World!');
    });
});
