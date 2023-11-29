<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore, useUsersStore } from '@/stores/Index.js';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { latestTemperature } = storeToRefs(usersStore);

// Placeholder icons
const temperatureIcon = "/public/thermometer.png"
const phIcon = "/public/ph.png";
const humidityIcon = "/public/humidity.png";
</script>

<template>
  <div v-if="user">
    <h1>Hola {{ user.firstName }}!</h1>

    <div class="sensor-cards-container">
      <!-- Temperature Card -->
      <div class="sensor-card">
        <img :src="temperatureIcon" alt="Ícono de Temperatura" class="sensor-icon" />
        <h2 class="sensor-title">Temperatura</h2>
        <p class="latest-data">{{ latestTemperature }}°C</p>
      </div>

      <!-- pH Card -->
      <div class="sensor-card">
        <img :src="phIcon" alt="Ícono de pH" class="sensor-icon" />
        <h2 class="sensor-title">Nivel de pH</h2>
        <!-- Placeholder data, replace with actual pH data -->
        <p class="latest-data">7.0</p>
      </div>

      <!-- Humidity Card -->
      <div class="sensor-card">
        <img :src="humidityIcon" alt="Ícono de Humedad" class="sensor-icon" />
        <h2 class="sensor-title">Humedad</h2>
        <!-- Placeholder data, replace with actual humidity data -->
        <p class="latest-data">60%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sensor-cards-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.sensor-card {
  width: 30%;
  padding: 20px;
  margin: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.sensor-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.sensor-title,
.latest-data {
  color: black;
  margin-top: 10px;
  white-space: nowrap; /* Prevent text from wrapping to the next line */
}
</style>
