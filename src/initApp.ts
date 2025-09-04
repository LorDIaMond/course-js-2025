import { reactive } from 'vue';
import initLessonsSelector from './utils/initLessonsSelector';

import type { IAppState } from './types';
import mountVueApp from './utils/vueApp';

interface IProps {
    iframeSelector: string;
    lessonSelector: string;
    tasksSelector: string;
    vueAppSelector: string;
}

export default function initApp(payload: IProps) {
    const state = reactive<IAppState>({
        activeTask: '',
        activeLesson: '',
        tasks: [],
    });

    initLessonsSelector({
        iframeSelector: payload.iframeSelector,
        lessonSelector: payload.lessonSelector,
        tasksSelector: payload.tasksSelector,
        appState: state,
    });

    mountVueApp(payload.vueAppSelector, state);

    const url = new URL(window.location.href);
    state.activeLesson = url.searchParams.get('lesson') ?? '';

    const loggerEl = document.querySelector('.app__logger')
    console = new Proxy(console, {
        get(target, param) {
            if (param === 'log') {
                return (...args) => {
                    for (const arg of args) {
                        const div = document.createElement('div');
                        div.classList.add('app__logger-row');

                        const code = document.createElement('code');
                        code.textContent = typeof arg === 'string'
                            ? arg
                            : JSON.stringify(arg);

                        div.appendChild(code);
                        loggerEl.appendChild(div);
                    }
                    target[param](...args);
                };
            }
            return target[param];
        },
    });
}
