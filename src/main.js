import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router/Index.js';
import { fakeBackend } from './helpers/Index.js';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


fakeBackend();

const app = createApp(App);
const pinia = createPinia();

app.use(vuetify);

app.use(pinia);
app.use(router);
app.mount('#app');
