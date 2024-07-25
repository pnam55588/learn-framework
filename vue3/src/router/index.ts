import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ProfileView from '@/views/ProfileView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
        },
        {
            path: '/about',
            name: 'About',
            component: AboutView,
        },
    ],
});

export default router;
