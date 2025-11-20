<template>
    <div class="satellite">
      <div class="satellite__radius">
        <span>Радиус орбиты спутника:</span>
        <input v-model="radius" type="text" class="form-control">
        <span>км</span>
      </div>

      <div class="satellite__speed">
        <h3>Требуемая скорость спутника:</h3>
        <div>
          {{ speed }} м/с
        </div>
        <img src="https://mediasat.info/wp-content/uploads/2015/06/sat-orbit.jpg"">
      </div>
    </div>
</template>

<script>
import {computed, ref} from 'vue';

export default {
    name: 'Satellite',

    setup() {
      const weightEarth = 6 * Math.pow(10, 24);
      const gravity = 6.67 * Math.pow(10, -11);

      const radius = ref();

      const speed = computed(() => {
        const rKm = Number(radius.value);
        if (!rKm || rKm <= 0 || Number.isNaN(rKm)) return Infinity;

        const rM = rKm * 1000;
        const v = Math.sqrt((gravity * weightEarth) / rM);
        return Math.round(v);
      });

      return {radius, speed};

    }
};
</script>

<style>

</style>
