<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type IUser from '@/types/user';
import { baseUrl } from '@/configs/api';
import { get, getWithToken } from '@/helpers/apiClient';

const user = ref<IUser>({
    name: '',
    email: '',
    age: 0,
    id: '',
    password: '',
});

// get user by fetching the user endpoint
const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    const res = await getWithToken<any>(baseUrl + '/users/me');
    if (res) {
        user.value = res.data;
    } else {
        console.log('failed to fetch user');
    }
};
onMounted(fetchUser);
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
