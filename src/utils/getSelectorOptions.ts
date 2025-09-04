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
const allHtml = import.meta.glob('../../Lessons/*/{Tasks,Homework}/**/index.html', { query: '?url' });
const allApps = import.meta.glob('../../Lessons/*/{Tasks,Homework}/*/App.vue', { query: '?url' });

export const getLessonsOptions = () => Object.entries(lessonModules).map(([path, loader]) => {
    const match = path.match(/\.\/Lessons\/(.*)\/README\.md$/);
    return match ? { id: match[1], path, loader } : null;
}).filter(Boolean) as LessonOption[];

const extractTaskId = (path: string) => {
    const match = path.match(/\.\.\/Lessons\/.*\/(Tasks|Homework)\/(Task (\d+)\. .*)\/(index\.(js|ts|html)|App\.vue)$/);

    return {
        taskType: match?.[1] ?? 'Tasks',
        id: match?.[2] ?? '',
        num: match?.[3] ?? 0,
        extension: match?.[5] ?? 'js',
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
                });
            }
        }

        matchingTasks.sort((a, b) => a.num - b.num);
        taskMap.set(id, matchingTasks);
    });

    return taskMap;
};
