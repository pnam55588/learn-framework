<script setup lang="ts">
import useSum from '@/hooks/useSum'

const { sum, increment } = useSum()
</script>

<template>
    <div class="title">Phố Wall chứng kiến tuần giao dịch kỷ lục</div>
    <div class="detail">
        <p>{{ sum }}</p>
        <p>detail 1</p>
        <p>detail 1</p>
        <p>detail 1</p>
    </div>
</template>

<style scoped>
.title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    padding: 20px;
    text-align: center;
    background-color: #007bff;
    color: white;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.detail {
    background-color: white;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    line-height: 1.6;
    max-width: 800px;
    margin: 20px auto;
}

@media (max-width: 600px) {
    .title {
        font-size: 20px;
        padding: 15px;
    }

    .content {
        padding: 15px;
        font-size: 14px;
    }
}
</style>
