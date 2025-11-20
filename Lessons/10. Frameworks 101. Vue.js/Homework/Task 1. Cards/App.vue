<template>
  <div class="card-container">
    <div class="card" v-for="card in products" :key="card.id">

      <img :src="card.src" class="card-img-top" alt="img" />

      <div class="card-body">
        <h5 class="card-title">
          {{ card.head }}
        </h5>

        <h4 class="card-title">
          {{ card.price }}
        </h4>

        <p class="card-text">
          {{ card.description }}
        </p>

        <div class="card__buttons">
          <button class="btn btn-primary button-plus" @click="inc(card)">+</button>
          <button class="btn btn-primary button-minus" @click="dec(card)">-</button>

          <div>{{ card.number }} шт.</div>
        </div>

        <div class="card__alert alert alert-danger" v-if="card.number > card.max">
          Данного товара доступно только {{ card.max }} шт.
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cards',

  props: {
    cards: {
      type: Array,
      required: true
    }
  },

  computed: {
    products() {
      return this.cards;
    }
  },

  methods: {
    inc(card) {
      card.number++;
    },
    dec(card) {
      if (card.number > 0) card.number--;
    }
  }
};
</script>
