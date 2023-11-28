import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/Index.js';
import { router } from '@/router/Index.js';
import { useAlertStore } from '@/stores/Index.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({

    id: 'auth',
    state: () => ({
        // Initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {

        async login(username, password) {

            try {
                const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });    

                // Update pinia state
                this.user = user;

                // Store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // Redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});