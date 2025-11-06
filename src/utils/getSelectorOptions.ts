type LessonModule = {
    default: () => void;
};

type LessonOption = {
    id: string;
    path: string;
    loader: () => Promise<LessonModule>;
};

const lessonModules = import.meta.glob<LessonModule>('../../Lessons/*/README.md', { query: '?raw' });
const allTasks = import.meta.glob('../../Lessons/*/{Tasks,Homework}/*/index.{js,ts}');
const allTasksRaw = import.meta.glob('../../Lessons/*/{Tasks,Homework}/*/index.{js,ts}', { query: '?raw' });
const tasksReadme = import.meta.glob('../../Lessons/*/{Tasks,Homework}/*/README.md', { query: '?raw' });
const allHtml = import.meta.glob('../../Lessons/*/{Tasks,Homework}/**/index.html', { query: '?url' });
const allApps = import.meta.glob('../../Lessons/*/{Tasks,Homework}/*/App.vue', { query: '?url' });

export const getLessonsOptions = () => Object.entries(lessonModules).map(([path, loader]) => {
    const match = path.match(/\.\/Lessons\/(.*)\/README\.md$/);
    return match ? { id: match[1], path, loader } : null;
}).filter(Boolean) as LessonOption[];

const extractTaskId = (path: string) => {
    const match = path.match(/\.\.\/Lessons\/.*\/(Tasks|Homework)\/(Task (\d+)\. .*)\/(index\.(js|ts|html)|App\.vue)$/);

    const taskData = {
        taskType: match?.[1] ?? 'Tasks',
        id: match?.[2] ?? '',
        num: match?.[3] ?? 0,
        extension: match?.[5] ?? 'vue',
    };
    return {
        ...taskData,
        id: `${ taskData.id } | ${ taskData.taskType } | ${ taskData.extension }`,
    };
};

const checkPath = (path: string, lessonName: string) => (
    path.includes(`/Lessons/${ lessonName }/Tasks/`)
    || path.includes(`/Lessons/${ lessonName }/Homework/`)
);

export const getTasksMap = (lessonsOptions: LessonOption[]) => {
    const taskMap = new Map();

    lessonsOptions.forEach(({ id }) => {
        const matchingTasks = [];

        for (const [path, loader] of Object.entries(allTasks)) {
            if (checkPath(path, id)) {
                matchingTasks.push({
                    loader,
                    ...extractTaskId(path),
                    type: 'js',
                    path: path.replace(/\/index\.\w$/, ''),
                    codeData: allTasksRaw[path](),
                    taskData: tasksReadme[path.slice(0, path.length - 8) + 'README.md']()
                });
            }
        }
        for (const [path, loader] of Object.entries(allHtml)) {
            if (checkPath(path, id)) {
                matchingTasks.push({
                    loader,
                    ...extractTaskId(path),
                    type: 'html',
                    path: path.replace(/\/index\.\w*$/, '/'),
                    taskData: tasksReadme[path.slice(0, path.length - 10) + 'README.md']?.(),
                });
            }
        }
        for (const [path, loader] of Object.entries(allApps)) {
            if (checkPath(path, id)) {
                matchingTasks.push({
                    loader,
                    ...extractTaskId(path),
                    type: 'vue',
                    path: path.replace(/\/index\.\w*$/, '/'),
                    taskData: tasksReadme[path.slice(0, path.length - 7) + 'README.md']()
                });
            }
        }

        matchingTasks.sort((a, b) => a.num - b.num);
        taskMap.set(id, matchingTasks);
    });

    return taskMap;
};
