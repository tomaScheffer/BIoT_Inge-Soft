<script setup>

  import { Nav, Alert } from '@/components/Index.js';
  import { useAuthStore } from '@/stores/Index.js';

  const authStore = useAuthStore();

</script>

<template>

    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav>

        </Nav>
        
        <Alert />
        <div>
            <router-view />
        </div>
    </div>

</template>

<style>

  @import '@/assets/base.css';

</style>