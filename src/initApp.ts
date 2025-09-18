import { reactive } from 'vue';
import initLessonsSelector from './utils/initLessonsSelector';

import type { IAppState } from './types';
import mountVueApp from './utils/vueApp';

interface IProps {
    executeSelector: string;
    iframeSelector: string;
    lessonSelector: string;
    tasksSelector: string;
    vueAppSelector: string;
    loggerSelector: string;
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
        executeSelector: payload.executeSelector,
        appState: state,
    });

    mountVueApp(payload.vueAppSelector, state);

    const url = new URL(window.location.href);
    state.activeLesson = url.searchParams.get('lesson') ?? '';

    const loggerEl = document.querySelector(payload.loggerSelector)
    console = new Proxy(console, {
        get(target, param) {
            if (param === 'log') {
                return (...args) => {
                    const div = document.createElement('div');

                    for (const arg of args) {
                        div.classList.add('app__logger-row');

                        const code = document.createElement('code');
                        try {
                            const text = typeof arg === 'string'
                                ? arg
                                : JSON.stringify(arg, null, '\t');
                            if (!text) {
                                continue;
                            }
                            code.textContent = text;
                        } catch (err) {
                            console.error(err);
                            code.textContent = 'Ошибка при сериализации данных';
                        }

                        div.appendChild(code);
                    }

                    if (div.children.length > 0) {
                        loggerEl.insertBefore(div, loggerEl.firstChild);
                    }
                    target[param](...args);
                };
            }
            return target[param];
        },
    });
}
