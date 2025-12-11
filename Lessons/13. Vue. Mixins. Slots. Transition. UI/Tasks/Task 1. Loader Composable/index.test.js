/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('13.c.1 LoaderMixin', () => {
    const wrapper = mount(App);

    it('13.c.1.1 press start button', async () => {
        const button = wrapper.find('.btn--start-loading');
        await button.trigger('click');
        expect(wrapper.find('.loader').exists()).toBe(true);
    });

    it('13.c.1.2 press finish button', async () => {
        const button = wrapper.find('.btn--finish-loading');
        await button.trigger('click');
        expect(wrapper.find('.loader').exists()).toBe(false);
    });
});
