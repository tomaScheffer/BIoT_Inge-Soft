import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/Index.js';
import { router } from '@/router/Index.js';
import { useAlertStore } from '@/stores/Index.js';

const baseUrl = `http://localhost:5000/api`;

export const useAuthStore = defineStore({

    id: 'auth',
    state: () => ({
        // Initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {

        async login(username, password) {

            fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Save the response in the user variable
                const user = data.username;
                
                // Update pinia state
                this.user = user;

                // Store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // Redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                const alertStore = useAlertStore();
                alertStore.error(error);   
            });   
        },
        logout() {
            
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});