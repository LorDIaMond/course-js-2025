<template>
    <div class="app">
        <Header
            :user-name="user.name"
            :cart-items-count="cart.items.length"
        />
        <ProductList
            :products="products"
            :cart="cart"
            @add-to-cart="addToCart"
        />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Header from './components/Header.vue';
import ProductList from './components/ProductList.vue';

const user = ref({
    name: 'Иван Петров',
    email: 'ivan@example.com',
});

const cart = reactive({
    items: [],
    total: 0,
});

const products = ref([
    { id: 1, name: 'Пицца', price: 500 },
    { id: 2, name: 'Бургер', price: 300 },
    { id: 3, name: 'Салат', price: 250 },
]);

function addToCart(product) {
    cart.items.push(product);
    cart.total += product.price;
}
</script>
