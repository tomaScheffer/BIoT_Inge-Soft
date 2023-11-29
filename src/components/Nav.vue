<script setup>

    import { useAuthStore } from '@/stores/Index.js';

    const authStore = useAuthStore();

</script>

<template>

    <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav w-100 justify-content-between">
            <router-link to="/" class="nav-item nav-link">Principal</router-link>
            <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Cerrar Sesión</button>
        </div>
    </nav>
    
</template>