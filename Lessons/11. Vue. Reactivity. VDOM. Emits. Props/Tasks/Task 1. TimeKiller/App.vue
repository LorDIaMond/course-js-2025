<template>
  <div class="time-killer">
    <button
        type="button"
        class="btn btn-warning"
        @click="addTime"
    >
      Добавить время!
    </button>
    <div class="times-container">
      <div
          v-for="(time, index) in times"
          :key="index"
          class="times-container__item"
          @mouseover="removeTime(index)"
      >
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeKiller',
  data() {
    return {
      times: []
    };
  },
  methods: {
    addTime() {
      const currentDate = new Date().toString();
      this.times.push(currentDate);
    },
    removeTime(index) {
      this.times.splice(index, 1);
    }
  }
};
</script>

<style>
.time-killer {
  margin: 100px;
  display: flex;
}

.time-killer > button {
  margin-right: 20px;
  align-self: baseline;
}

.times-container__item {
  padding: 10px;
  margin-bottom: 10px;
  background: #fffdb1;
  border: 1px solid #e1dfa2;
  border-radius: 4px;
}
</style>