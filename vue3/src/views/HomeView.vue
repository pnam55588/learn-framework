<script setup lang="ts">
import NewsContent from './NewsContent.vue'
</script>

<template>
    <main>
        <ul>
            <li><a href="#">News 1</a></li>
            <li><a href="#">News 2</a></li>
            <li><a href="#">News 3</a></li>
            <li><a href="#">News 4</a></li>
        </ul>

        <div class="news-content">
            <NewsContent />
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 200px;
}

li {
    margin-bottom: 10px;
}

li a {
    text-decoration: none;
    color: #007bff;
    font-size: 16px;
    padding: 10px;
    display: block;
    background-color: #f9f9f9;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

li a:hover {
    background-color: #e9e9e9;
}

.news-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    main {
        flex-direction: column;
    }

    ul {
        width: 100%;
        margin-bottom: 20px;
    }
}
</style>
