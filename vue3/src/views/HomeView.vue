<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { baseUrl } from '@/api/api'

const email = ref('nam@gmail.com')
const password = ref('123')

const onSubmit = async () => {
    try {
        const response = await fetch(baseUrl + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const res = await response.json()
        localStorage.setItem('token', res.token)

        router.push('/profile')
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
    }
}
</script>

<template>
    <main>
        <div class="form">
            <label for="email">email:</label>
            <input type="email" required v-model="email" />
            <label for="password">password:</label>
            <input type="password" required v-model="password" />
            <button @click="onSubmit">Login</button>
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
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
input {
    padding: 5px;
    border: 1px solid #ccc;
}

button {
    padding: 5px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: pointer;
}
@media (max-width: 768px) {
    main {
        flex-direction: column;
    }
}
</style>
