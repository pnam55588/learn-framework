<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { baseUrl } from '@/configs/api';
import { post } from '@/helpers/apiClient';

const email = ref('nam@gmail.com');
const password = ref('123');
const onSubmit = async () => {
    const res = await post<any>(baseUrl + '/auth/login', {
        email: email.value,
        password: password.value,
    });
    if (res) {
        localStorage.setItem('token', res.data.token);
        router.push('/profile');
    } else {
        console.log('login failed');
    }
};
</script>

<template>
    <main>
        <div class="form">
            <label for="email">Email:</label>
            <input type="password" required v-model="email" />
            <label for="password">Password:</label>
            <input type="password" required v-model="password" />
            <button @click="onSubmit">Login</button>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    max-width: 100%;
}
input {
    padding: 10px;
    border: 1px solid #ccc;
}

button {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
}
@media (max-width: 768px) {
    main {
    }
}
</style>
