<template>
    <div class="sun-container">
        <div class="sun-container__block sun-container__block--sun">
            <h3>Нажми на солнце</h3>
            <div class="sun-container__img">
                <img
                    ref="sun"
                    src="/Lessons/12. Vue. Properties. Refs. Modal/Tasks/Task 1. SizeOfSun/assets/sun.svg"
                    class="sun-container__the-sun"
                    alt=""
                    @click="onReduceSunSize"
                >
            </div>
        </div>
        <div class="sun-container__block">
            <!-- Начало -->

            <!-- Конец -->
        </div>
    </div>
</template>

<script>
import { ref, shallowRef } from 'vue';

export default {
    name: 'TheSun',
    setup() {
        const sun = shallowRef(null);
        const diameter = ref(1392700);
        const year = ref(2021);
        const imageWidthInPx = ref(450);

        const NUM_OF_ADDITIONS_YEARS = 500000;
        const REDUCTION_FACTOR = 0.95;

        const onReduceSunSize = () => {
            //Начало
            //Конец
        };

        return {
            sun,
            year,
            diameter,
            onReduceSunSize,
        };
    },
};
</script>

<style>
.sun-container,
.sun-container__block {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sun-container {
    margin: 30px;
    color: #f6f6f6;
    background: url('/Lessons/12. Vue. Properties. Refs. Modal/Tasks/Task 1. SizeOfSun/assets/sky.jpg') center center/cover no-repeat;
}

.sun-container__block {
    margin-top: 20px;
}

.sun-container__block--sun {
    height: 500px;
}

.sun-container__img {
    height: 100%;
    vertical-align: middle;

}

.sun-container__block > h3 {
    margin-bottom: 15px;
}

.sun-container__block > span {
    font-size: 20px;
}

.sun-container__the-sun {
    width: 450px;
    height: 100%;
    cursor: pointer;
    transition: width 0.4s ease-in-out;
}
</style>
