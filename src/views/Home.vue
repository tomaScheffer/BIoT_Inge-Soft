<script setup>

import { storeToRefs } from 'pinia';
import { useAuthStore, useUsersStore } from '@/stores/Index.js';


const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useUsersStore();
//let  latestTemperature  = 15;
//let  latestHumedity  = 80;
//let  latestPh  = 7;

// Placeholder icons
const temperatureIcon = "/thermometer.png"
const phIcon = "/ph.png";
const humidityIcon = "/humidity.png";
 
 
</script> 

<script>
export default {
  data() {
    return {
      //mensaje: '¡Hola, Vue!',
      latestTemperature: null,
      latestHumedity: null,
      latestPh: null,
      intervalId: null, // Nuevo: variable para almacenar el ID del intervalo
    };
  },
  methods: {
    async obtener() {
      //alert(this.mensaje);
      try {
        // Realiza una solicitud directa al servidor Express
        const response = await fetch('http://localhost:5000/api/obtenerValoresDispositivo');
        const data = await response.json();

        this.latestTemperature = data[2].cl_valorInstantaneoInterpretadoSensores;
        this.latestHumedity = data[1].cl_valorInstantaneoInterpretadoSensores;
        this.latestPh = data[0].cl_valorInstantaneoInterpretadoSensores;
  
      //latestTemperature = data[2].cl_valorInstantaneoInterpretadoSensores;
        console.log('data:',data);
        //console.log('Datos de la base de datos:', data);
        // Realizar alguna acción con los datos, como mostrarlos en la interfaz de usuario.
      } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
      }


    },
    iniciarActualizacionAutomatica() {
      // Detener el intervalo anterior si existe
      clearInterval(this.intervalId);

      // Iniciar la actualización automática cada segundo
      this.intervalId = setInterval(this.obtener, 1000);
    },
  },

  mounted() {
    // Inicia la actualización automática al montar el componente
    this.iniciarActualizacionAutomatica();
  },

  // Nuevo: Asegurarse de detener el intervalo antes de destruir el componente
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>




 
<template>
  <div v-if="user">
    <h1>Hola {{ user }}!</h1>
     <div>
      <a href="http://localhost:3000/d/sLUcEOMIk/moisture?orgId=1&refresh=5s"  target="_blank">Dashboard</a>

   </div>  
   
      
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
        <p class="latest-data">{{ latestPh }}</p>
      </div>

      <!-- Humidity Card -->
      <div class="sensor-card">
        <img :src="humidityIcon" alt="Ícono de Humedad" class="sensor-icon" />
        <h2 class="sensor-title">Humedad</h2>
        <!-- Placeholder data, replace with actual humidity data -->
        <p class="latest-data">{{ latestHumedity }}</p>
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
