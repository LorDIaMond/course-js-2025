/**
 * @jest-environment jsdom
 */
import { mount } from '@vue/test-utils';
import Satellite from './App.vue';

describe('10.c.1 Satellite', () => {
    const wrapper = mount(Satellite);
    const input = wrapper.find('.form-control');

    it('10.c.1.2 with radius 42000k', async () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('10.c.1.3 with radius 42000k', async () => {
        input.element.value = 42000;
        await input.trigger('input');
        expect(wrapper.text()).toContain('3087 м/с');
    });

    it('10.c.1.4 with radius 101010k', async () => {
        input.element.value = 101010;
        await input.trigger('input');
        expect(wrapper.text()).toContain('1990 м/с');
    });

    it('10.c.1.5 with radius 7400k', async () => {
        input.element.value = 7400;
        await input.trigger('input');
        expect(wrapper.text()).toContain('7354 м/с');
    });
});
