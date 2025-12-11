<template>
  <div class="recipe-container">
    <h3>Мои рецепты </h3>

    <div v-if="recipes.length === 0" class="recipe-container__no-recipes">
      Рецептов нет
    </div>

    <div
        v-for="(recipe, index) in recipes"
        :key="index"
        class="card"
    >
      <div class="card-body">
        <div class="card-body__header">
          <h4>{{ recipe.name }}</h4>
          <VeganIcon />
          {{ recipe.isVegetarian ? 'Да' : 'Нет' }}
          <TimeIcon />
          {{ getCookTimeText(recipe.cookTime) }}
        </div>
        Ингредиенты: {{ recipe.ingredients }}
        <button
            class="btn btn-light card-body__remove-button"
            @click="removeRecipe(index)"
        >
          Удалить рецепт
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VeganIcon from '../icons/VeganIcon.vue';
import TimeIcon from '../icons/TimeIcon.vue';

export default {
  name: 'RecipesContainer',
  components: {
    VeganIcon,
    TimeIcon
  },
  props: {
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      timeOptions: [
        { value: 1, text: '5 минут' },
        { value: 2, text: '10 минут' },
        { value: 3, text: '15 минут' },
        { value: 4, text: '20 минут' },
        { value: 5, text: '30 минут' },
        { value: 6, text: '40 минут' },
        { value: 7, text: '50 минут' },
        { value: 8, text: '1 час' },
        { value: 9, text: '1,5 часа' },
        { value: 10, text: '2 часа' },
        { value: 11, text: '2,5 часа' },
        { value: 12, text: '3 часа' },
        { value: 13, text: 'Бесконечность' },
      ]
    };
  },
  methods: {
    getCookTimeText(cookTimeValue) {
      const option = this.timeOptions.find(opt => opt.value === cookTimeValue);
      return option ? option.text : '5 минут';
    },
    removeRecipe(index) {
      this.$emit('remove-recipe', index);
    }
  }
};
</script>