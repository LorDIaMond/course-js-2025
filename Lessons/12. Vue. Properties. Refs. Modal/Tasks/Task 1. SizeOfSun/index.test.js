/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import TheSun from './App.vue';

describe('12.c1 TheSun', () => {
    const wrapper = mount(TheSun);

    it('12.c1.1 TheSun has setup', () => {
        expect(typeof TheSun.setup).toBe('function');
    });

    it('12.c1.2 TheSun is a Vue instance', () => {
        expect(wrapper.vm).toBeTruthy();
    });

    it('12.c1.3 click on the sun once', async () => {
        const sunImg = wrapper.find('.sun-container__the-sun');
        await sunImg.trigger('click');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('12.c1.4 click on the two more times', async () => {
        const sunImg = wrapper.find('.sun-container__the-sun');
        await sunImg.trigger('click');
        await sunImg.trigger('click');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('12.c1.5 click on the sun one more time', async () => {
        const sunImg = wrapper.find('.sun-container__the-sun');
        await sunImg.trigger('click');
        expect(wrapper.element).toMatchSnapshot();
    });
});
