<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from '@/router'
</script>

<template>
    <div class="app">
        <header>
            <nav>
                <RouterLink to="/" active-class="active">Home</RouterLink>
                <RouterLink to="/about" active-class="active">About</RouterLink>
            </nav>
        </header>
        <div class="content">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #50b498; /* Màu xanh dương nhạt */
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Tạo bóng đổ cho header */
}

nav {
    display: flex;
    gap: 15px;
}

nav a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

nav a:hover {
    background-color: #468585; /* Màu xanh dương đậm khi hover */
}

nav a.active {
    background-color: #468585; /* Màu xanh dương đậm khi active */
}

.content {
    padding: 20px;
    background-color: #def9c4;
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-top: 5px;
}
</style>
