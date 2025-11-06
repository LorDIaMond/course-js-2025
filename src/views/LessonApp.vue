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

const allApps = import.meta.glob('../../Lessons/*/{Tasks,Homework}/*/App.vue');

const props = defineProps<{
    appState: IAppState;
}>();

const taskComponent = computed(() => {
    const [activeTaskDirName, type] = props.appState.activeTask.split(' | ');

    const classworkPath = `../../Lessons/${ props.appState.activeLesson }/${ type }/${ activeTaskDirName }/App.vue`;
    if (Object.hasOwn(allApps, classworkPath)) {
        return defineAsyncComponent(allApps[classworkPath]);
    }

    return null;
});
</script>
