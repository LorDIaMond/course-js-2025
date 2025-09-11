import { watch } from 'vue';
import { getTasksMap, getLessonsOptions } from './getSelectorOptions';

import type { IAppState } from '../types';

const entries = getLessonsOptions();
const taskMap = getTasksMap(entries);

interface IElements {
    lessonSelector: HTMLSelectElement;
    taskSelector: HTMLSelectElement;
    executeButton?: HTMLButtonElement;
    iframeElement?: HTMLIFrameElement;
}

let lastModule: any = null;
const executeModuleJs = (module: any) => {
    lastModule = module;
    if (Object.hasOwn(module, 'default')) {
        const payload = module.payload ?? (window as any).payload ?? [];
        const result = (
            module.default.prototype
            && module.default.prototype.constructor === module.default
        )
            ? new module.default(...payload)
            : module.default(...payload);

        if (result) {
            console.log('Аргументы: ', payload);
            console.log('Итог: ', result);
        }
    }
};

const initListeners = (state: IAppState, elements: IElements, url: URL) => {
    elements.lessonSelector.addEventListener('change', async () => {
        state.tasks = [];
        const lessonId = elements.lessonSelector.value;
        if (!lessonId) {
            elements.taskSelector.style.display = 'none';
            return;
        }

        elements.taskSelector.style.display = '';

        const lesson = entries.find(entry => entry.id === lessonId);
        if (!lesson) {
            console.warn(`Урок ${lessonId} не найден`);
            return;
        }

        state.activeLesson = lessonId;
        state.tasks = taskMap.get(lessonId);
        state.activeTask = url.searchParams.get('task');
    });

    elements.taskSelector.addEventListener('change', () => {
        state.activeTask = elements.taskSelector.value;
    });

    elements.executeButton.addEventListener('click', () => {
        if (lastModule !== null) {
            executeModuleJs(lastModule);
        }
    });
};

const initWatchers = (state: IAppState, elements: IElements, url: URL) => {
    watch(() => state.activeLesson, (newLesson) => {
        if (newLesson === null) {
            return;
        }

        url.searchParams.set('lesson', state.activeLesson);
        window.history.pushState({}, '', url.href);

        elements.lessonSelector.value = state.activeLesson;
        elements.lessonSelector.dispatchEvent(new Event('change'));
    });

    watch(() => state.activeTask, async (newTaskId) => {
        elements.iframeElement.src = '';
        elements.executeButton.style.display = 'none';
        const taskCodeEl = document.querySelector('.app__task-code') as HTMLDivElement;
        const taskTextEl = document.querySelector('.app__task-text') as HTMLDivElement;
        taskCodeEl.style.display = 'none';
        taskTextEl.style.display = 'none';

        if (newTaskId === null) {
            return;
        }

        url.searchParams.set('task', newTaskId);
        window.history.pushState({}, '', url.href);

        elements.taskSelector.value = newTaskId;
        const activeTaskData = state.tasks.find((taskData) => taskData.id === newTaskId);
        if (!activeTaskData) {
            return;
        }

        const module = await activeTaskData.loader();

        if (Object.hasOwn(activeTaskData, 'taskData')) {
            activeTaskData.taskData.then((result) => {
                taskTextEl.style.display = '';
                taskTextEl.querySelector('.app__task-content').innerHTML = result.default;
            });
        }

        if (activeTaskData.type === 'js') {
            elements.executeButton.style.display = '';
            executeModuleJs(module);

            if (Object.hasOwn(activeTaskData, 'codeData')) {
                activeTaskData.codeData.then((result) => {
                    taskCodeEl.style.display = '';
                    taskCodeEl.querySelector('.app__code-data').innerHTML = result.default;
                });
            }

            return;
        }

        if (activeTaskData.type === 'html') {
            elements.iframeElement.src = module.default;
        }
    });

    watch(() => state.tasks, (newTasks) => {
        for (let i = elements.taskSelector.options.length - 1; i > 0; i -= 1) {
            elements.taskSelector.remove(i);
        }

        newTasks.forEach((taskData) => {
            const option = document.createElement('option');
            option.value = taskData.id;
            option.textContent = taskData.id;
            elements.taskSelector.appendChild(option);
        });
    });
};

interface IProps {
    iframeSelector: string;
    lessonSelector: string;
    tasksSelector: string;
    executeSelector: string;
    appState: IAppState;
}

export default function initLessonsSelector(payload: IProps) {
    const lessonSelector = document.querySelector(payload.lessonSelector) as HTMLSelectElement;
    const taskSelector = document.querySelector(payload.tasksSelector) as HTMLSelectElement;
    const iframeElement = document.querySelector(payload.iframeSelector) as HTMLIFrameElement;
    const executeButton = document.querySelector(payload.executeSelector) as HTMLButtonElement;
    executeButton.style.display = 'none';

    const url = new URL(window.location.href);

    entries.forEach(({ id }) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = id;
        lessonSelector.appendChild(option);
    });

    initListeners(
        payload.appState,
        {
            lessonSelector,
            taskSelector,
            executeButton,
        },
        url,
    );

    initWatchers(
        payload.appState,
        {
            lessonSelector,
            taskSelector,
            iframeElement,
            executeButton,
        },
        url,
    );
}
