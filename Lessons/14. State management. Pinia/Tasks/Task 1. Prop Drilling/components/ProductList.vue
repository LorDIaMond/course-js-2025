<template>
    <div class="product-list">
        <div
            v-for="product in products"
            :key="product.id"
            class="product-item"
        >
            <h3>{{ product.name }}</h3>
            <p>Цена: {{ product.price }} ₽</p>
            <button @click="addToCart(product)">
                Добавить в корзину
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    products: Array,
    cart: Object,
});

const emit = defineEmits(['add-to-cart']);

function addToCart(product) {
    emit('add-to-cart', product);
}
</script>

<style lang="scss">
.product-list {
    display: flex;
    gap: 30px;
}
</style>
