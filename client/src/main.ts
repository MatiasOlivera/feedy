import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import router from './router';
import store from './store';

// Plugins
Vue.use(Buefy);

// Environment variables
if (!process.env.VUE_APP_API_ENDPOINT) {
  throw new Error(
    `The VUE_APP_API_ENDPOINT env variable must be initialised.
    Please, go to the .env file and add it`
  );
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
