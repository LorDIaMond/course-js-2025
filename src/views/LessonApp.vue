<template>
    <div>
        <component
            v-if="taskComponent"
            :is="taskComponent"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

import type { IAppState } from '../types';

const allApps = import.meta.glob('../../Lessons/*/{Tasks, Homework}/*/App.vue');

const props = defineProps<{
    appState: IAppState;
}>();

const taskComponent = computed(() => {
    const classworkPath = `../../Lessons/${ props.appState.activeLesson }/Tasks/${ props.appState.activeTask }/App.vue`;
    if (Object.hasOwn(allApps, classworkPath)) {
        return defineAsyncComponent(allApps[classworkPath]);
    }

    const homeworkPath = `../../Lessons/${ props.appState.activeLesson }/Homework/${ props.appState.activeTask }/App.vue`;
    if (Object.hasOwn(allApps, homeworkPath)) {
        return defineAsyncComponent(allApps[homeworkPath]);
    }

    return null;
});
</script>
