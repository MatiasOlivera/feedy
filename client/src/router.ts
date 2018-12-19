import Vue from 'vue';
import Router from 'vue-router';

// Views
import ViewHome from './views/ViewHome.vue';

// Routes
export const ROUTE_HOME = 'home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: ROUTE_HOME,
      path: '/',
      component: ViewHome
    }
  ]
});
