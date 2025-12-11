<template>
    <header class="header">
        <div class="user-info">
            Привет, {{ userName }}!
        </div>
        <div class="cart-info">
            Корзина: {{ cartItemsCount }} товаров
        </div>
    </header>
</template>

<script setup>
defineProps({
    userName: String,
    cartItemsCount: Number,
});
</script>
