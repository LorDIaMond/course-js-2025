<template>
  <div class="recipes">
    <NewRecipeForm @add-recipe="addRecipe" />
    <RecipesContainer
        :recipes="recipes"
        @remove-recipe="removeRecipe"
    />
  </div>
</template>

<script>
import NewRecipeForm from './components/NewRecipeForm.vue';
import RecipesContainer from './components/RecipesContainer.vue';

export default {
  name: 'Recipes',
  components: {
    NewRecipeForm,
    RecipesContainer
  },
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    addRecipe(newRecipe) {
      this.recipes.push(newRecipe);
    },
    removeRecipe(index) {
      this.recipes.splice(index, 1);
    }
  }
};
</script>

<style>
.recipes {
  width: 1000px;
  margin: 40px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background: whitesmoke;
  border-radius: 15px;
}

.recipes > div {
  width: 50%;
}
</style>
