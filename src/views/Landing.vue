<template>
  <v-app>
    <!-- Top navigation bar -->
    <v-toolbar app style="background-color: rgb(7, 143, 7);" dark>
      <v-container fluid>
        <v-row align="center" justify="space-between"> <!-- justify="space-between" added -->
          <v-col cols="auto">
            <v-img src="/logo.ico" class="logo-image"></v-img>
          </v-col>
          <!-- Button on the far right -->
          <v-col cols="auto">
            <!-- Router link added to the button -->
            <router-link to="/account/login">
              <v-btn color="white" text>Iniciar Sesión</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>

    <!-- Background image with text and buttons -->
    <v-container fluid class="landing-page-container">
      <!-- Text and buttons -->
      <div class="landing-page-content">
        <img src="/plant.png" class="plant-image">
        <div class="text-container">
          <h1 class="text-center white-text title">Bienvenido a BIoT</h1>
          <p class="text-center white-text subheader">¡Accede al estado de tus cultivos en tiempo real y desde cualquier lugar!</p>
          <p class="text">Con nuestros sensores podrá medir el pH, humedad y temperatura de sus cultivos</p>
          <p class="text">Contáctanos en <a href="mailto:biot_soporte@gmail.com" class="gmail-link">biot-soporte@gmail.com</a> para obtener la cantidad de sensores recomendada y un precio personalizado, según el área de control necesaria.</p>
        </div>
      </div>
    </v-container>

    <!-- Footer -->
    <v-footer app color="primary" dark>
      <span>&copy; 2024 BIoT</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'LandingPage',
}
</script>

<style>
.logo-image {
  width: 120px; /* Adjust the width as needed */
}

.landing-page-container {
  background-color: rgb(0, 70, 0); /* Set the background color to a darker green */
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Adjust the height as needed */
}

.landing-page-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center; /* Align text to the center */
  color: rgb(255, 255, 255); /* Set text color to white */
  padding: 50px; /* Adjust padding as needed */
}

.plant-image {
  width: 400px; /* Adjust the width as needed */
}

.text-container {
  max-width: 60%; /* Adjust the width as needed */
}

.title {
  font-size: 3rem;
  margin-bottom: 20px; /* Add margin below the title */
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}

.subheader {
  font-size: 2rem;
  margin-bottom: 15px; /* Add margin below the subheader */
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}

.white-text {
  color: rgb(255, 255, 255); /* Set text color to white */
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}

.gmail-link {
  color: #00aaff; /* Adjust color as needed */
  text-decoration: underline; /* Add underline to indicate link */
  cursor: pointer; /* Change cursor to indicate clickable link */
}

.gmail-link:hover {
  color: #0077cc; /* Adjust hover color as needed */
}

.text {
  color: rgb(255, 255, 255);
  font-size: 1.3rem;
  margin-top: 10%;
  font-family: 'Roboto', sans-serif; /* Use Roboto font */
}
</style>