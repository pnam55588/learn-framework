<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type IUser from '@/types/user'
import { baseUrl } from '@/api/api'

const user = ref<IUser>({
    name: '',
    email: '',
    age: 0,
    id: '',
    password: ''
})

// get user by fetching the user endpoint
const fetchUser = async () => {
    try {
        const response = await fetch(baseUrl + 'user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        user.value = await response.json()
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
    }
}
onMounted(fetchUser)
</script>

<template>
    <main>
        <div class="profile">
            <h1>PROFILE</h1>
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
            <p>{{ user.age }}</p>
        </div>
    </main>
</template>

<style scoped>
/* Your component styles go here */
</style>
