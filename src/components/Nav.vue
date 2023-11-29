<script setup>
import { useAuthStore } from '@/stores/Index.js';
const authStore = useAuthStore();
let highlight = false;
</script>

<template>
  <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark" style="background-color: rgb(7, 143, 7);">
    <div class="navbar-nav w-100 d-flex justify-content-between align-items-center">
      <router-link to="/">
        <img src="logo.ico" alt="Icon" class="nav-icon" />
        <span class="nav-text" :class="{ 'highlighted': highlight }" @mouseover="highlight = true" @mouseleave="highlight = false">
          <span class="white-text">Panel</span>
        </span>
      </router-link>
      <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<style scoped>
.nav-icon {
  width: auto;
  height: 20px;
  margin-right: 25px; /* Increase the margin-right for more spacing */
}

/* Additional style for the text */
.nav-text {
  margin-top: 2px; /* Adjust the margin-top for vertical spacing */
}

/* Highlight effect */
.highlighted {
  text-decoration: underline;
}

/* White text style */
.white-text {
  color: white;
}
</style>
