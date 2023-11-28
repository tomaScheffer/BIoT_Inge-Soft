<script setup>

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/Index.js';

    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);

</script>

<template>

    <div v-if="user">
        <h1>Hola {{user.firstName}}!</h1>
    </div>

</template>