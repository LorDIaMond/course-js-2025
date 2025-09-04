import { createApp } from 'vue';
import LessonApp from '../views/LessonApp.vue';

import type { IAppState } from '../types';

export default function mountVueApp(rootSelector: string, appState: IAppState) {
    const app = createApp(LessonApp, {
        appState,
    });

    app.mount(rootSelector);
}
