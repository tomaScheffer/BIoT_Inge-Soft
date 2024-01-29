import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/Index.js';
import { useAuthStore } from '@/stores/Index.js';

const baseUrl = `http://localhost:5000/api`;

export const useUsersStore = defineStore({

    id: 'users',
    state: () => ({
        
        users: {},
        user: {}
    }),
    actions: {

        async register(user) {
            try {
                const response = await fetch(`${baseUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error en el registro');
                }

                // Registration successful

            } catch (error) {
                // Handle registration error
                console.error('Error during user registration:', error);
                throw error;
            }
        },
        async getAll() {

            this.users = { loading: true };
            try {
                this.users = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id) {

            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id, params) {

            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // Update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // Update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // Update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id) {
            // Add isDeleting prop to user being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // Remove user from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // Auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});