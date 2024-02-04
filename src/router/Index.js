import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useAlertStore } from '@/stores/Index.js';
import { Home } from '@/views/Index.js';
import { Landing } from '@/views/Index.js';
import accountRoutes from './Account-routes';
import usersRoutes from './Users-routes';

export const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: Home },
        { path: '/landing', component: Landing },
        { ...accountRoutes },
        { ...usersRoutes },
        // Catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    // Clear alert on route change
    const alertStore = useAlertStore();
    alertStore.clear();

    // Redirect to login page if not logged in and trying to access a restricted page 
    const publicPages = ['/account/login', '/account/register', '/landing'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/landing';
    }
});