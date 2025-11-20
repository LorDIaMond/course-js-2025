<template>
  <div class="carousel">
    <!--Начало-->
    <div class="carousel-inner">

      <div
          v-for="(src, i) in images"
          :key="i"
          :class="['carousel-item', { active: i === currentIndex }]"
      >
        <img :src="src" class="d-block w-100" />
      </div>

    </div>

    <button class="carousel-control-prev" @click="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>

    <button class="carousel-control-next" @click="next">
      <span class="carousel-control-next-icon"></span>
    </button>
    <!--Конец-->
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Carousel",

  props: {
    images: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const currentIndex = ref(0);

    function next() {
      currentIndex.value =
          (currentIndex.value + 1) % props.images.length;
    }

    function prev() {
      currentIndex.value =
          (currentIndex.value - 1 + props.images.length) %
          props.images.length;
    }

    return { currentIndex, next, prev };
  }
};
</script>
