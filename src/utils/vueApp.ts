import { createApp } from 'vue';
import LessonApp from '../views/LessonApp.vue';

import type { IAppState } from '../types';
import { createPinia } from 'pinia';

export default function mountVueApp(rootSelector: string, appState: IAppState) {
    const app = createApp(LessonApp, {
        appState,
    });

    app.use(createPinia());
    app.mount(rootSelector);
}
